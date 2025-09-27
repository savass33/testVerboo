from flask import Flask, request, jsonify
from flask_cors import CORS

from db.connection import create_connection
from services.feedbacks import Feedbacks
from services.stats import Stats
from services.customers import Customer
from services.franchise import Franchise
from services.categories import Category

app = Flask(__name__)
CORS(app)

# creating services
feedback_service = Feedbacks()
stats_service = Stats()
customer_service = Customer()
franchise_service = Franchise()
category_service = Category()

# home route (debug use only)
@app.route("/", methods=["GET"])
def home():
    return "Home"

# feedback route
@app.route("/feedbacks", methods=["POST"])
def create_feedback():
    data = request.get_json()
    message = data.get("message_text")
    category_name = data.get("category")
    notes = data.get("notes")
    customer_name = data.get("customer_name")
    franchise_name = data.get("franchise_unit")
    is_update = data.get("update", False)

    # IDs
    customer_id = (
        customer_service.get_or_create(customer_name) if customer_name else None
    )
    franchise_id = (
        franchise_service.get_or_create(franchise_name) if franchise_name else None
    )
    category_id = (
        category_service.get_or_create(category_name) if category_name else None
    )

    # last customer feedback
    last_feedback = (
        feedback_service.get_last_feedback_by_customer(customer_id)
        if customer_id
        else None
    )

    if is_update and last_feedback:
        feedback_service.update(
            feedback_id=last_feedback["id"],
            customer_id=customer_id,
            franchise_id=franchise_id,
            category_id=category_id,
            notes=notes,
        )
        return jsonify({"id": last_feedback["id"], "status": "updated"}), 200

    if not message or not category_name:
        return (
            jsonify(
                {"error": "message_text and category are required for new feedback"}
            ),
            400,
        )

    insert_id = feedback_service.insert(
        customer_id=customer_id,
        franchise_id=franchise_id,
        category_id=category_id,
        message_text=message,
        notes=notes,
    )

    return jsonify({"id": insert_id, "status": "created"}), 201


@app.route("/feedbacks", methods=["GET"])
def list_feedbacks():
    franchise_name = request.args.get("franchise_unit")
    category_name = request.args.get("category")

    franchise_id = (
        franchise_service.get_or_create(franchise_name) if franchise_name else None
    )
    category_id = (
        category_service.get_or_create(category_name) if category_name else None
    )

    feedbacks = feedback_service.get_feedbacks(
        franchise_id=franchise_id, category_id=category_id
    )
    return jsonify(feedbacks), 200


@app.route("/stats", methods=["GET"])
def stats():
    statistics = stats_service.get_stats()
    return jsonify(statistics), 200


if __name__ == "__main__":
    app.run()

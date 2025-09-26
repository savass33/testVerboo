from flask import Flask, request, jsonify
from services.feedbacks import Feedbacks
from services.stats import Stats
from services.customers import Customer
from services.franchise import Franchise
from services.categories import Category
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Instanciando serviços
feedback_service = Feedbacks()
stats_service = Stats()
customer_service = Customer()
franchise_service = Franchise()
category_service = Category()


@app.route("/", methods=["GET"])
def home():
    return "Home"


@app.route("/feedbacks", methods=["POST"])
def create_feedback():
    data = request.get_json()
    message = data.get("message_text")
    category_name = data.get("category")
    notes = data.get("notes")
    customer_name = data.get("customer_name")
    franchise_name = data.get("franchise_unit")

    if not message or not category_name or not customer_name or not franchise_name:
        return (
            jsonify(
                {
                    "error": "message_text, category, customer_name and franchise_unit are required"
                }
            ),
            400,
        )

    # Transformando nomes em IDs
    customer_id = customer_service.get_or_create(customer_name)
    franchise_id = franchise_service.get_or_create(franchise_name)
    category_id = category_service.get_or_create(category_name)

    # Inserindo feedback
    insert_id = feedback_service.insert(
        customer_id=customer_id,
        franchise_id=franchise_id,
        category_id=category_id,
        message_text=message,
        notes=notes,
    )

    return jsonify({"id": insert_id, "status": "ok"}), 201


@app.route("/feedbacks", methods=["GET"])
def list_feedbacks():
    # Recebendo possíveis filtros via query params
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

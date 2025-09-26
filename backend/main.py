from flask import Flask, request, jsonify
from services.get_feedbacks import get_feedbacks
from services.insert_feedback import insert_feedback
from services.stats import get_stats

app = Flask(__name__)  # Initialize Flask


@app.route(
    "/",
    methods=["GET"],
)
def home():
    return "Home"


@app.route(
    "/feedbacks",
    methods=[
        "POST"
    ],  # POST is used when it's necessary to send data to server for create something
)
def create_feedback():
    data = request.get_json()  # Receive data from JSON

    # Split the JSON info
    message = data.get("message_text")
    category = data.get("category")
    notes = data.get("notes")
    customer_name = data.get("customer_name")
    franchise_unit = data.get("franchise_unit")

    if not message or not category:
        return (
            jsonify({"error": "message_text and/or category is necessary"}),
            400,
        )  # 400 -> bad request

    insert_id = insert_feedback(customer_name, message, notes, category, franchise_unit)
    return jsonify({"id": insert_id, "status": "ok"}), 201


@app.route(
    "/feedbacks",
    methods=["GET"],  # GET is used when it's necessary to receive data from server
)
def list_feedbacks():
    category = request.args.get("category")
    franchise_unit = request.args.get("franchise_unit")

    feedbacks = get_feedbacks(category, franchise_unit)

    return jsonify(feedbacks), 200  # 200 -> Ok


@app.route("/stats", methods=["GET"])
def stats():
    statistics = get_stats()
    return jsonify(statistics), 200


# Run server
if __name__ == "__main__":
    app.run()

from flask import Flask, request, jsonify
from flask_cors import CORS
from google.cloud import bigquery
from datetime import datetime
import json
import os

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

bq_client = bigquery.Client()
TABLE_ID = "savvy-celerity-486104-t8.travel_app.travel_plans"


@app.route("/api/v1/submit-plan", methods=["POST"])
def submit_plan():

    data = request.get_json()

    row = {
        "source_city": data.get("source_city"),
        "destination_city": data.get("destination_city"),
        "start_date": data.get("start_date"),
        "end_date": data.get("end_date"),
        "number_of_persons": data.get("number_of_persons"),
        "travellers": json.dumps(data.get("travellers")),
        "preferred_transport": data.get("preferred_transport"),
        "interests": data.get("interests"),
        "additional_comment": data.get("additional_comment"),
        "created_at": datetime.utcnow().isoformat()
    }

    bq_client.insert_rows_json(TABLE_ID, [row])

    return jsonify({
        "status": "success",
        "message": "Travel plan received"
    })


@app.route("/")
def home():
    return "API is running"


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)

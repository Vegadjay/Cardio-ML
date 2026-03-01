import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model", "model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "model", "scaler.pkl")

model = pickle.load(open(MODEL_PATH, "rb"))
scaler = pickle.load(open(SCALER_PATH, "rb"))

@app.route('/')
def home():
    return "CardioAI API is running"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print(f"Received prediction request: {data}")

        height = float(data.get('height'))
        weight = float(data.get('weight'))

        height_m = height / 100
        bmi = weight / (height_m ** 2) if height_m > 0 else 0

        features = [
            float(data.get('age')),      # age in days
            float(data.get('gender')),
            height,
            weight,
            float(data.get('ap_hi')),
            float(data.get('ap_lo')),
            float(data.get('cholesterol')),
            float(data.get('gluc')),
            float(data.get('smoke')),
            float(data.get('alco')),
            float(data.get('active')),
            bmi
        ]

        input_data = np.array(features).reshape(1, -1)

        # ONLY scale here
        data_scaled = scaler.transform(input_data)

        prob = model.predict_proba(data_scaled)[0][1]

        result = {
            "prediction": int(prob > 0.5),
            "risk_score": round(prob * 100, 2)
        }

        print(f"Prediction result: {result}")
        return jsonify(result)

    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

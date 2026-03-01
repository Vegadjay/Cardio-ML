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
        
        age_years = float(data.get('age')) // 365
        age_scaled = (age_years - 29) / (64 - 29)

        height_raw = float(data.get('height'))
        height_scaled = (height_raw - 55) / (250 - 55)

        weight_kg = float(data.get('weight'))
        weight_scaled = (weight_kg - 10.0) / (200.0 - 10.0)

        height_m = height_raw / 100
        bmi = weight_kg / (height_m ** 2) if height_m > 0 else 0

        ap_hi_scaled = (float(data.get('ap_hi')) - (-150)) / (16020 - (-150))
        ap_lo_scaled = (float(data.get('ap_lo')) - (-70)) / (11000 - (-70))
        
        cholesterol_scaled = (float(data.get('cholesterol')) - 1) / 2
        gluc_scaled = (float(data.get('gluc')) - 1) / 2

        features = [
            age_scaled,
            float(data.get('gender')),
            height_scaled,
            weight_scaled,
            ap_hi_scaled,
            ap_lo_scaled,
            cholesterol_scaled,
            gluc_scaled,
            float(data.get('smoke')),
            float(data.get('alco')),
            float(data.get('active')),
            float(bmi)
        ]

        input_data = np.array(features).reshape(1, -1)
        data_scaled = scaler.transform(input_data)
        
        prediction = model.predict(data_scaled)[0]
        
        result = {
            "prediction": int(prediction),
            "risk_score": int(prediction * 100)
        }

        # Try to get probability if possible
        if hasattr(model, "predict_proba"):
             result["risk_score"] = int(model.predict_proba(data_scaled)[0][1] * 100)

        print(f"Prediction result: {result}")
        return jsonify(result)

    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

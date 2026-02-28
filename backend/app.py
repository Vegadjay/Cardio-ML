import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Get the directory where app.py is located
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
        # Expect JSON data
        data = request.json
        print(f"Received prediction request: {data}")
        
        # Calculate BMI (weight in kg / (height in m)^2)
        height_m = float(data.get('height')) / 100
        weight_kg = float(data.get('weight'))
        bmi = weight_kg / (height_m ** 2) if height_m > 0 else 0
        
        # Extract features in correct order as trained:
        # age, gender, height, weight, ap_hi, ap_lo, cholesterol, gluc, smoke, alco, active, bmi
        features = [
            float(data.get('age')),
            float(data.get('gender')),
            float(data.get('height')),
            float(data.get('weight')),
            float(data.get('ap_hi')),
            float(data.get('ap_lo')),
            float(data.get('cholesterol')),
            float(data.get('gluc')),
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

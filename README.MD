# Cardio-ML

Cardio-ML is a machine learning-powered web application designed to predict the risk of cardiovascular disease based on various patient health metrics and lifestyle factors. It features a modern, responsive frontend and a robust backend API.

## Project Structure

The repository is structured into two main components:

- **`frontend/`**: A modern Next.js web application that provides an interactive user interface for data entry and displays the prediction results.
- **`backend/`**: A Python Flask API that serves the trained machine learning model, processes incoming patient data, and returns the calculated cardiovascular disease risk score.

## Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Library**: React
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Shadcn UI & Radix UI
- **Data Visualization**: Recharts

### Backend
- **Framework**: [Flask](https://flask.palletsprojects.com/)
- **Machine Learning**: Scikit-Learn, Pandas, NumPy
- **Model Serialization**: Pickle (joblib)
- **Deployment**: Gunicorn (configured via Procfile)

## Getting Started

To run the application locally, you will need to start both the backend server and the frontend development server.

### 1. Backend Setup

The backend serves the ML model predictions via a RESTful API.

```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install the required dependencies
pip install -r requirements.txt

# Start the Flask server
python app.py
```
The backend API will start running on `http://localhost:5000` (or the port specified in your environment variables).

### 2. Frontend Setup

The frontend is the user-facing web application.

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies (use npm, yarn, pnpm, or bun)
npm install

# Start the development server
npm run dev
```
The frontend application will start running on `http://localhost:3000`. Open this URL in your web browser.

## API Reference

The backend provides a `/predict` endpoint to evaluate cardiovascular risk.

### `POST /predict`

**Request Body (JSON):**
```json
{
  "age": 18250,         // Age in days
  "gender": 1,          // 1: Women, 2: Men (or based on dataset encoding)
  "height": 165,        // Height in cm
  "weight": 70,         // Weight in kg
  "ap_hi": 120,         // Systolic blood pressure
  "ap_lo": 80,          // Diastolic blood pressure
  "cholesterol": 1,     // 1: normal, 2: above normal, 3: well above normal
  "gluc": 1,            // 1: normal, 2: above normal, 3: well above normal
  "smoke": 0,           // 0: non-smoker, 1: smoker
  "alco": 0,            // 0: doesn't drink, 1: drinks
  "active": 1           // Physical activity (1: active, 0: not active)
}
```

*Note: The backend automatically calculates BMI (`weight / height_m^2`) from the provided height and weight before feeding the data into the model.*

**Response (JSON):**
```json
{
  "prediction": 0,      // 0: No disease, 1: Presence of disease
  "risk_score": 25.4    // Percentage probability of cardiovascular risk
}
```

## Model Training

The `backend/` directory also contains Jupyter Notebooks used for data exploration and model training:
- `Task_1.ipynb`: Likely used for exploratory data analysis, data cleaning, and feature engineering.
- `Train_Test.ipynb`: Contains the machine learning pipeline, model training, evaluation, and serialization (saved into the `model/` directory as `model.pkl` and `scaler.pkl`).

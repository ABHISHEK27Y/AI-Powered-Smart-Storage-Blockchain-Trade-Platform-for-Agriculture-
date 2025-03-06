from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained AI model
model = joblib.load("storage_ai_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get data from ESP32
        data = request.json
        features = np.array([[data["temperature"], data["humidity"], data["moisture"], data["gas_level"], data["weight"]]])

        # AI Prediction
        prediction = model.predict(features)[0]

        # Convert prediction to readable format
        result = "Safe Storage" if prediction == 1 else "Unsafe Storage"

        return jsonify({"prediction": result})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

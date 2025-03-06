from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # Enable CORS to allow React frontend to access Flask backend

# Simulated sensor data endpoint
@app.route('/data', methods=['GET'])
def get_data():
    data = {
        "temperature": random.randint(20, 40),
        "humidity": random.randint(40, 90),
        "moisture": random.randint(300, 700),
        "gas_level": random.randint(0, 100),
        "weight": random.randint(200, 600),
        "status": "Good" if random.randint(0, 1) == 1 else "Bad"
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)


Our project is designed to optimize agricultural 
storage and secure trade using AI 
and blockchain technology. It collects real-time 
environmental data from various sensors, processes 
the data using an AI model, and makes intelligent
 decisions to improve crop storage conditions. 
 Additionally, blockchain ensures secure and 
 transparent trade between farmers and buyers.



1.DHT22 Sensor (Temperature & Humidity)
Function: Measures temperature and humidity in the storage unit.
Importance:
AI will analyze temperature and humidity trends to prevent spoilage.
Alerts will be generated if conditions exceed safe limits.
Storage units will be automatically adjusted (e.g., activating fans, dehumidifiers, or coolers).




2. Soil Moisture Sensor
Function: Detects moisture levels in the soil (if used in farms) or moisture buildup in storage.
Importance:
Helps in detecting excess humidity inside storage that may cause mold or fungal growth.
If high moisture is detected, AI can suggest dehumidification or ventilation to maintain crop quality.


3.Gas Sensor (MQ Series)
Function: Detects harmful gases like CO₂, methane, and ammonia.
Importance:
Early detection of gas buildup inside storage can prevent food contamination.
AI will alert users and suggest ventilation if toxic gas levels exceed safe thresholds.
Prevents health hazards and loss of stored grains.



4.Weight Sensor
Function: Measures the weight of stored crops.
Importance:
AI can track the amount of stock available in real time.
Helps in inventory management, preventing overstocking or shortages.
Ensures transparency in trade transactions.


5️. Camera Module (Optional)
Function: Captures images of stored crops and analyzes them using AI.
Importance:
AI can detect mold, pests, or rot using image recognition.
Helps identify spoilage early, preventing huge losses.




How This Will Help in Our Project
✔ AI-Based Predictions:

AI will analyze sensor data and predict potential spoilage risks.
Alerts will be sent to farmers if any condition requires attention.
✔ Automated Storage Control:

If humidity is high, AI can trigger dehumidifiers or fans.
If gas levels rise, AI will alert users to ventilate the storage.
✔ Blockchain for Trade:

Sensor data will be recorded on a blockchain for transparency.
Buyers can check authentic storage conditions before purchasing.
Ensures fair pricing & prevents fraud in agricultural trade.



app.py is typically the Flask API that allows your AI model to interact with external devices (like ESP32) or a frontend application.

What app.py Does?
Loads the AI model (model.pkl).
Receives data (e.g., sensor values) via HTTP requests.
Runs predictions using the model.
Returns the predicted output as a response.
How It Works?
ESP32 or any other device sends sensor data (temperature, humidity, etc.) to app.py.
app.py processes the data and predicts the status (Good/Bad).
It sends the result back to the requesting device.

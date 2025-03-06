// Install ESP32 Board in Arduino IDE (if not done).
// Install required libraries for DHT, MQ sensors, etc.
// Update WiFi credentials (WIFI_SSID and WIFI_PASS).
// Replace SERVER_IP with your AI model's server IP.

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <DHT.h>

// Replace with your WiFi credentials
const char* WIFI_SSID = "your_wifi_ssid";
const char* WIFI_PASS = "your_wifi_password";

// Replace with your AI model server IP
const char* SERVER_IP = "http://your-server-ip:5000/predict";

// Define sensor pins
#define DHTPIN 4  // GPIO pin for DHT sensor
#define DHTTYPE DHT22  // Change if using DHT11
DHT dht(DHTPIN, DHTTYPE);

const int soilMoisturePin = 34;  // Soil moisture sensor pin
const int gasSensorPin = 35;  // MQ gas sensor pin
const int tempSensorPin = 36;  // Additional temperature sensor (optional)

void setup() {
    Serial.begin(115200);
    WiFi.begin(WIFI_SSID, WIFI_PASS);
    
    Serial.print("Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("\nConnected to WiFi!");
    
    dht.begin();
}

void loop() {
    if (WiFi.status() == WL_CONNECTED) {
        float temperature = dht.readTemperature();
        float humidity = dht.readHumidity();
        int soilMoisture = analogRead(soilMoisturePin);
        int gasLevel = analogRead(gasSensorPin);
        int extraTemp = analogRead(tempSensorPin);

        if (isnan(temperature) || isnan(humidity)) {
            Serial.println("Failed to read from DHT sensor!");
            return;
        }

        // Prepare JSON payload
        StaticJsonDocument<200> jsonDoc;
        jsonDoc["temperature"] = temperature;
        jsonDoc["humidity"] = humidity;
        jsonDoc["soil_moisture"] = soilMoisture;
        jsonDoc["gas_level"] = gasLevel;
        jsonDoc["extra_temperature"] = extraTemp;

        String jsonData;
        serializeJson(jsonDoc, jsonData);

        // Send data to AI model server
        HTTPClient http;
        http.begin(SERVER_IP);
        http.addHeader("Content-Type", "application/json");

        int httpResponseCode = http.POST(jsonData);
        if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.println("Server Response: " + response);
        } else {
            Serial.print("Error in sending data. Code: ");
            Serial.println(httpResponseCode);
        }

        http.end();
    } else {
        Serial.println("WiFi Disconnected! Reconnecting...");
        WiFi.begin(WIFI_SSID, WIFI_PASS);
    }

    delay(5000); // Send data every 5 seconds
}

import { useState, useEffect } from "react";

function App() {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    // Fetch data from Flask backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/data");
        const data = await response.json();
        setSensorData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Auto-refresh every 5 seconds

    return () => clearInterval(interval); // Clean up interval
  }, []);

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Smart Agriculture Dashboard</h1>
      {sensorData ? (
        <div style={{ fontSize: "20px" }}>
          <p><strong>Temperature:</strong> {sensorData.temperature}°C</p>
          <p><strong>Humidity:</strong> {sensorData.humidity}%</p>
          <p><strong>Soil Moisture:</strong> {sensorData.moisture}</p>
          <p><strong>Gas Level:</strong> {sensorData.gas_level}</p>
          <p><strong>Weight:</strong> {sensorData.weight} kg</p>
          <p><strong>Status:</strong> 
            <span style={{ color: sensorData.status === "Good" ? "green" : "red", fontWeight: "bold" }}>
              {sensorData.status}
            </span>
          </p>
        </div>
      ) : (
        <p>Loading sensor data...</p>
      )}
    </div>
  );
}

export default App;

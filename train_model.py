import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load data from CSV
data = pd.read_csv("storage_data.csv")  # Ensure the file is in the same directory

# Print the first few rows to check column names
print(data.head())

# Define features and target
X = data[['temperature', 'humidity', 'moisture', 'gas_level', 'weight']]
y = data['status']  # Target variable (e.g., "Good" or "Bad")

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save trained model
joblib.dump(model, "model.pkl")

print("✅ Model trained and saved as model.pkl")

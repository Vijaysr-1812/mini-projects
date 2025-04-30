import pandas as pd
import ast
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import r2_score

# Load dataset
file_path = "Carbon Emission.csv"  # Ensure this file exists in Colab
df = pd.read_csv(file_path)

# Handle missing values correctly
df = df.fillna({'Vehicle Type': 'Unknown'})

# Convert list-like string features ('Recycling' & 'Cooking_With') to categorical representation
df['Recycling'] = df['Recycling'].apply(lambda x: ','.join(ast.literal_eval(x)) if isinstance(x, str) else x)
df['Cooking_With'] = df['Cooking_With'].apply(lambda x: ','.join(ast.literal_eval(x)) if isinstance(x, str) else x)

# Select categorical and numerical columns
categorical_cols = ['Body Type', 'Sex', 'Diet', 'How Often Shower', 'Heating Energy Source', 'Transport',
                    'Vehicle Type', 'Social Activity', 'Frequency of Traveling by Air', 'Waste Bag Size',
                    'Energy efficiency', 'Recycling', 'Cooking_With']

numerical_cols = ['Monthly Grocery Bill', 'Vehicle Monthly Distance Km', 'Waste Bag Weekly Count',
                  'How Long TV PC Daily Hour', 'How Many New Clothes Monthly', 'How Long Internet Daily Hour']

# Apply One-Hot Encoding to categorical columns
df_encoded = pd.get_dummies(df, columns=categorical_cols, drop_first=True)

# Define features (X) and target (y)
X = df_encoded.drop(columns=['CarbonEmission'])
y = df_encoded['CarbonEmission']

# Split dataset into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Gradient Boosting model
model = GradientBoostingRegressor(n_estimators=500, learning_rate=0.1, max_depth=6, random_state=42)
model.fit(X_train, y_train)

# Predictions and evaluation
y_pred = model.predict(X_test)
accuracy = r2_score(y_test, y_pred) * 100
print(f"✅ Model Accuracy (R² Score): {accuracy:.2f}%")

# Function to predict carbon footprint for a new input
def predict_carbon_footprint(input_data):
    input_df = pd.DataFrame([input_data])  # Convert dictionary to DataFrame

    # Apply One-Hot Encoding to match training data
    input_encoded = pd.get_dummies(input_df, columns=categorical_cols, drop_first=True)

    # Ensure input has the same columns as X_train (fill missing columns with 0)
    input_encoded = input_encoded.reindex(columns=X_train.columns, fill_value=0)

    return model.predict(input_encoded)[0]

# Example Usage (Extracting from Original df, not X)
example_row = df.iloc[0].drop(labels=['CarbonEmission'])  # Remove target column
example_input = example_row.to_dict()  # Convert to dictionary

predicted_value = predict_carbon_footprint(example_input)
print(f"🌱 Predicted Carbon Footprint: {predicted_value:.2f} kg CO₂e")

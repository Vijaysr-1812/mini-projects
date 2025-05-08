from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import json
import traceback

app = Flask(__name__)
CORS(app)

# Load model and expected columns
with open("carbon_emission_model_xgboost.pkl", "rb") as f:
    model = pickle.load(f)

with open("model_columns.json", "r") as f:
    model_columns = json.load(f)

def preprocess_input(data):
    flat_data = {}

    # Map numerical input fields to exact model columns
    field_mappings = {
        "monthlyGroceryBill": "Monthly Grocery Bill",
        "vehicleMonthlyDistanceKm": "Vehicle Monthly Distance Km",
        "wasteBagWeeklyCount": "Waste Bag Weekly Count",
        "howLongTVPCDailyHour": "How Long TV PC Daily Hour",
        "howLongInternetDailyHour": "How Long Internet Daily Hour",
        "howManyNewClothesMonthly": "How Many New Clothes Monthly"
    }

    for input_field, model_field in field_mappings.items():
        try:
            flat_data[model_field] = float(data.get(input_field, 0))
        except:
            flat_data[model_field] = 0.0

    # Handle single-choice categorical fields with exact model column format
    single_categoricals = {
        "bodyType": "Body Type",
        "sex": "Sex",
        "diet": "Diet",
        "showerFrequency": "How Often Shower",
        "heatingEnergy": "Heating Energy Source",
        "transport": "Transport",
        "vehicleType": "Vehicle Type",
        "socialActivity": "Social Activity",
        "travelFrequency": "Frequency of Traveling by Air",
        "wasteBagSize": "Waste Bag Size",
        "energyEfficiency": "Energy efficiency"
    }

    for field, prefix in single_categoricals.items():
        value = str(data.get(field, "")).strip()
        column_name = f"{prefix}_{value}"
        if column_name in model_columns:
            flat_data[column_name] = 1

    # Handle multi-select fields
    multi_fields = {
        "cooking": "Cooking",
        "recycling": "Recycling"
    }

    for field, prefix in multi_fields.items():
        selected_options = data.get(field, [])
        for option in selected_options:
            opt = str(option).strip()
            column_name = f"{prefix}_{opt}"
            if column_name in model_columns:
                flat_data[column_name] = 1

    # Create DataFrame and align with model columns
    df = pd.DataFrame([flat_data])
    df_encoded = df.reindex(columns=model_columns, fill_value=0)

    # Debug
    print("Preprocessed input:")
    print(df_encoded.head())
    print("Non-zero input features:", df_encoded.loc[:, df_encoded.any()].columns.tolist())

    return df_encoded



@app.route("/services", methods=["POST"])
def predict():
    try:
        input_json = request.get_json()
        print("Received input JSON:", input_json)

        features = preprocess_input(input_json)
        prediction = model.predict(features)[0]
        print("Prediction:", float(prediction))

        return jsonify({"footprint": float(prediction)})

    except Exception as e:
        print("Error occurred:")
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
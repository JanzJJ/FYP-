from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
import sys
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# Get the absolute path to the backend directory
backend_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(backend_dir, "model/dog_skin_disease_model.h5")

# Load the trained model
try:
    model = load_model(model_path)
except Exception as e:
    print(f"Warning: Could not load model from {model_path}: {e}")
    model = None

# Define upload folder - use /tmp for Render
UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "/tmp/uploads")
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Class labels
CLASS_LABELS = ["Dermatitis", "Fungal Infections", "Healthy", "Hypersensitivity", "Demodicosis", "Ringworm"]

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"}), 200

@app.route("/", methods=["GET", "POST"])
def index():
    return jsonify({"message": "StayCare Backend API"}), 200

@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500
    
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    filepath = os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(file.filename))
    file.save(filepath)

    try:
        # Preprocess image
        img = image.load_img(filepath, target_size=(224, 224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0

        # Predict
        predictions = model.predict(img_array)
        class_index = np.argmax(predictions)
        result = CLASS_LABELS[class_index]

        return jsonify({"prediction": result}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    finally:
        # Clean up uploaded file
        if os.path.exists(filepath):
            os.remove(filepath)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=False)

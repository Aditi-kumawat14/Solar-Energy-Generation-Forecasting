
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

import pandas as pd
import joblib
from pathlib import Path


# Project paths
BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = BASE_DIR / "models" / "random_forest_solar_model.pkl"
FEATURE_PATH = BASE_DIR / "models" / "feature_names.pkl"

TEMPLATE_PATH = BASE_DIR / "api" / "templates" / "index.html"
STATIC_PATH = BASE_DIR / "api" / "static"


# Create FastAPI application
app = FastAPI(
    title="Solar Energy Generation API",
    description="API for predicting solar power generation",
    version="1.0"
)


# Serve CSS and JavaScript
app.mount(
    "/static",
    StaticFiles(directory=str(STATIC_PATH)),
    name="static"
)


# Load trained model
model = joblib.load(MODEL_PATH)
features = joblib.load(FEATURE_PATH)


# Input data structure
class SolarInput(BaseModel):

    poa_irradiance_wm2: float = Field(ge=0)
    ghi_irradiance_wm2: float = Field(ge=0)

    ambient_temperature_celsius: float
    panel_temperature_celsius: float

    wind_speed_ms: float = Field(ge=0)

    hour: int = Field(ge=0, le=23)
    day: int = Field(ge=1, le=31)
    month: int = Field(ge=1, le=12)
    day_of_week: int = Field(ge=0, le=6)


# Frontend home page
@app.get("/")
def home():

    return FileResponse(TEMPLATE_PATH)


# Prediction endpoint
@app.post("/predict")
def predict_solar_power(data: SolarInput):

    input_data = pd.DataFrame(
        [data.model_dump()],
        columns=features
    )

    prediction = model.predict(input_data)

    return {
        "predicted_power_w": round(float(prediction[0]), 2),
        "predicted_power_kw": round(float(prediction[0]) / 1000, 2)
    }

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
import joblib

app = FastAPI()

# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = joblib.load(
    "student_mental_health_model.pkl"
)

@app.get("/")
def home():

    return {
        "message": "Mental Health API Running"
    }

@app.post("/predict")
def predict(data: dict):

    input_data = pd.DataFrame([{

        "choose_your_gender":
            data["gender"],

        "age":
            data["age"],

        "what_is_your_course":
            data["course"],

        "your_current_year_of_study":
            data["year"],

        "what_is_your_cgpa":
            data["cgpa"],

        "marital_status":
            data["marital_status"],

        "do_you_have_anxiety":
            data["anxiety"],

        "do_you_have_panic_attack":
            data["panic_attack"],

        "did_you_seek_any_specialist_for_a_treatment":
            data["seek_help"]

    }])

    prediction = model.predict(input_data)

    result = (
        "Depression"
        if prediction[0] == 1
        else "No Depression"
    )

    return {
        "prediction": result
    }
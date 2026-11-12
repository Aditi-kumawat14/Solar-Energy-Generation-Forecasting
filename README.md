# ☀️ Solar Energy Generation Forecasting

A Machine Learning-based web application that predicts solar power generation using weather conditions and time-related parameters.

**Live Application:** [Solar Energy Generation Forecasting](https://solar-energy-generation-forecasting.onrender.com)

**API Documentation:** [FastAPI Swagger Docs](https://solar-energy-generation-forecasting.onrender.com/docs)

---

## 📌 Project Overview

Solar energy generation depends on several environmental factors, including solar irradiance, temperature, wind speed, and time of day.

This project uses Machine Learning to predict solar power generation based on these parameters.

The project uses the **BR-PVGen (Brazilian Photovoltaic Generation) Dataset**, focusing on the PS_001 solar power plant.

A Random Forest Regression model is trained and integrated with FastAPI to provide real-time predictions through an interactive web interface.

## 🎯 Objectives

- Analyze solar power generation and weather data.
- Perform data cleaning, preprocessing, and integration.
- Explore relationships between weather conditions and solar generation.
- Identify unusual observations and data quality issues.
- Develop and evaluate Machine Learning regression models.
- Build an API for solar power prediction.
- Deploy the application online for public access.

## 📊 Dataset

**Dataset:** BR-PVGen – Brazilian Photovoltaic Generation Dataset

**Source:** [BR-PVGen Dataset](https://github.com/)

The project focuses on the **PS_001 plant**.

The dataset contains two major categories of information:

### 1. Inverter Data
- Timestamp
- Total Active Power
- Total DC Power
- Total Reactive Power
- Inverter ID
- Plant ID

### 2. Meteorological Data
- Global Horizontal Irradiance (GHI)
- Plane of Array Irradiance (POA)
- Ambient Temperature
- Panel Temperature
- Wind Speed
- Wind Direction
- Precipitation

The inverter and meteorological datasets are integrated using timestamp and plant ID.

## 🛠️ Technologies Used

| Category | Technologies |
|---|---|
| Programming Language | Python |
| Data Analysis | Pandas, NumPy |
| Data Visualization | Matplotlib, Seaborn |
| Machine Learning | Scikit-learn |
| ML Algorithm | Random Forest Regression |
| Model Evaluation | MAE, RMSE, R² Score |
| Backend | FastAPI |
| Frontend | HTML, CSS, JavaScript |
| Model Serialization | Joblib |
| Deployment | Render |
| Version Control | Git, GitHub |

## ⚙️ Project Workflow

1. **Data Understanding:** Understand the inverter, weather, and plant metadata.
2. **Data Cleaning:** Handle missing values and negative irradiance readings.
3. **Data Integration:** Aggregate inverter readings and merge them with weather data.
4. **Exploratory Data Analysis:** Analyze generation patterns, weather relationships, and anomalies.
5. **Feature Engineering:** Extract hour, day, month, and day of the week.
6. **Model Training:** Train Linear Regression and Random Forest Regression models.
7. **Hyperparameter Tuning:** Use GridSearchCV with TimeSeriesSplit.
8. **Model Evaluation:** Evaluate model performance using a chronological train-test split.
9. **API Development:** Integrate the trained model with FastAPI.
10. **Deployment:** Deploy the complete application using Render.

## 🤖 Machine Learning Model

Two regression algorithms were evaluated:

- Linear Regression
- Random Forest Regression

Random Forest performed better and was selected as the final model.

### Model Performance

Final evaluation using a chronological 80:20 train-test split:

| Evaluation Metric | Random Forest |
|---|---:|
| MAE | 171,979.99 W |
| RMSE | 356,201.97 W |
| R² Score | 0.9613 |

### Model Comparison

| Metric | Linear Regression | Random Forest |
|---|---:|---:|
| MAE | 324,925.93 W | 171,979.99 W |
| RMSE | 608,363.23 W | 356,201.97 W |
| R² Score | 0.8871 | 0.9613 |

The Random Forest model achieved an R² score of approximately **96.13%** and reduced MAE by approximately 47.1% compared with Linear Regression.

### Feature Importance

The most influential features according to the trained Random Forest model were:

| Feature | Importance |
|---|---:|
| POA Irradiance | 85.76% |
| GHI Irradiance | 9.81% |
| Month | 1.91% |
| Hour | 1.58% |

POA and GHI irradiance together account for approximately 95.57% of the model's feature importance.

*Note: Feature importance indicates the model's reliance on features; it does not establish causation.*

## 🌐 Web Application

The application provides an interactive interface where users can enter:

- POA Irradiance (W/m²)
- GHI Irradiance (W/m²)
- Ambient Temperature (°C)
- Panel Temperature (°C)
- Wind Speed (m/s)
- Hour
- Day
- Month
- Day of Week

After submitting the inputs, the application displays predicted solar power generation in:

- Watts (W)
- Kilowatts (kW)
- Megawatts (MW)

## 🖥️ Application Preview

**Live Demo:** [Open Solar Energy Forecasting Application](https://solar-energy-generation-forecasting.onrender.com)

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Aditi-kumawat14/Solar-Energy-Generation-Forecasting.git
```

### 2. Navigate to the project directory

```bash
cd Solar-Energy-Generation-Forecasting
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the FastAPI application

```bash
python -m uvicorn api.main:app --reload
```

### 5. Open the application

Frontend:

```text
http://127.0.0.1:8000
```

API Documentation:

```text
http://127.0.0.1:8000/docs
```

## 📁 Project Structure

```text
Solar-Energy-Generation-Forecasting/
│
├── api/
│   ├── main.py
│   ├── templates/
│   │   └── index.html
│   └── static/
│       ├── style.css
│       └── script.js
│
├── data/
│   ├── raw/
│   └── processed/
│
├── models/
│   ├── random_forest_solar_model.pkl
│   └── feature_names.pkl
│
├── notebook/
│   ├── 01_data_understanding.ipynb
│   ├── 02_data_cleaning.ipynb
│   ├── 03_data_integration.ipynb
│   ├── 04_eda.ipynb
│   └── 05_modeling.ipynb
│
├── requirements.txt
├── README.md
└── .gitignore
```

*Some local project folders, such as dashboard and reports, are excluded from the GitHub repository.*

## ⚠️ Challenges and Observations

During data analysis, two unusual observations were identified:

- 22 August 2024 at 09:00 UTC
- 23 August 2024 at 08:45 UTC

These observations showed relatively high active power despite near-zero or negative raw irradiance readings.

The observations were flagged for further investigation rather than removed or artificially corrected.

This highlights the importance of data quality checks in real-world solar energy forecasting.

## 🔮 Future Improvements

- Add prediction history and downloadable reports.
- Integrate SHAP for model explainability.
- Develop a Power BI dashboard for interactive analysis.
- Explore additional forecasting algorithms.
- Extend the analysis to multiple solar power plants.
- Improve input validation and prediction reliability.

## 👩‍💻 Author

**Aditi Kumawat**

BE Computer Engineering

GitHub: [Aditi-kumawat14](https://github.com/Aditi-kumawat14)

---

⭐ If you find this project interesting, consider giving the repository a star!

**Built with Python, Machine Learning and FastAPI.**

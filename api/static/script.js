
// Get HTML elements
const form = document.getElementById("predictionForm");

const predictButton = document.getElementById("predictButton");

const resultValue = document.getElementById("resultValue");
const resultKW = document.getElementById("resultKW");
const resultStatus = document.getElementById("resultStatus");
const errorMessage = document.getElementById("errorMessage");


// Handle form submission
form.addEventListener("submit", async function (event) {

    // Prevent page refresh
    event.preventDefault();

    // Clear previous error
    errorMessage.textContent = "";

    // Disable button while predicting
    predictButton.disabled = true;
    predictButton.textContent = "Predicting...";

    try {

        // Collect input values from the form
        const formData = new FormData(form);

        const data = {};

        formData.forEach((value, key) => {
            data[key] = Number(value);
        });


        // Send input data to FastAPI
        const response = await fetch("/predict", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });


        // Convert API response into JSON
        const result = await response.json();


        // Check for API errors
        if (!response.ok) {

            throw new Error(
                result.detail || "Unable to generate prediction"
            );

        }


        // Get predicted values
        const powerW = result.predicted_power_w;
        const powerKW = result.predicted_power_kw;
        const powerMW = powerKW / 1000;


        // Display prediction in Watts
        resultValue.textContent =
            powerW.toLocaleString("en-IN", {
                maximumFractionDigits: 2
            }) + " W";


        // Display prediction in kW and MW
        resultKW.textContent =
            powerKW.toLocaleString("en-IN", {
                maximumFractionDigits: 2
            }) +
            " kW (≈ " +
            powerMW.toFixed(3) +
            " MW)";


        // Success message
        resultStatus.textContent =
            "Prediction generated successfully!";

    }

    catch (error) {

        // Display error message
        errorMessage.textContent = error.message;

        resultStatus.textContent =
            "Prediction could not be generated.";

    }

    finally {

        // Enable button again
        predictButton.disabled = false;

        predictButton.textContent =
            "⚡ Predict Solar Power";

    }

});

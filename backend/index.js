const express = require("express");
const axios = require("axios");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const cities = [
  "Kuala Lumpur",
  "George Town",
  "Johor Bahru",
  "Ipoh",
  "Shah Alam",
  "Kota Kinabalu",
  "Kuching",
  "Malacca",
  "Putrajaya",
];

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

// Nodemailer transport setup
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

app.get("/weather", async (req, res) => {
  try {
    const weatherData = await Promise.all(
      cities.map(async (city) => {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: city,
              appid: API_KEY,
              units: "metric",
            },
          }
        );
        return response.data;
      })
    );
    res.json(weatherData);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/subscribe", async (req, res) => {
  const { email, name, location } = req.body;
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: location,
          appid: API_KEY,
          units: "metric",
        },
      }
    );
    const weatherData = response.data;
    const condition = weatherData.weather[0].main;
    const temperature = weatherData.main.temp;

    let alertMessage = "";
    if (
      condition.toLowerCase().includes("rain") ||
      condition.toLowerCase().includes("thunderstorm")
    ) {
      alertMessage = `Alert: There is a ${condition} expected in ${location}. Please take necessary precautions.`;
    }

    const mailOptions = {
      from: "no-reply@umbrella.com",
      to: email,
      subject: `Your Current Weather Forecast for ${location}`,
      text: `

Thank you for subscribing to our weather alert service!

Here is the current weather forecast for ${location}:

Weather Condition: ${condition}
Temperature: ${temperature}°C

${alertMessage}

Stay safe and stay updated with the latest weather information.

Best regards,
The UMbrella Team`,
    };

    await transport.sendMail(mailOptions);
    res.status(200).json({ message: "Subscription successful, email sent!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

app.get("/weather/:location", async (req, res) => {
  const { location } = req.params;
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: location,
          appid: API_KEY,
          units: "metric",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

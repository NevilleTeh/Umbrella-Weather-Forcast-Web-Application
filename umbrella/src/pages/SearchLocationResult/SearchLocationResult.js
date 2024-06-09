import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./SearchLocationResult.css";

const SearchLocationResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const locationQuery = queryParams.get("location");

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      console.log(`Fetching weather data for: ${locationQuery}`);
      try {
        const response = await fetch(
          `http://localhost:5000/weather/${locationQuery}`
        );
        if (!response.ok) {
          throw new Error(
            `Error fetching weather data: ${response.statusText}`
          );
        }
        const data = await response.json();
        console.log("Weather data received:", data);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (locationQuery) {
      fetchWeather();
    }
  }, [locationQuery]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { name, weather, main } = weatherData;
  const weatherCondition = weather[0].main;
  const weatherDescription = weather[0].description;
  const temperature = main.temp;
  const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="search-location-result">
      <Header />
      <div className="main-content">
        <div className="map-container">
          <iframe
            title="location-map"
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${name}`}
            allowFullScreen
          ></iframe>
          <div className="weather-info-container">
            <div className="weather-header">
              <h2>{name}</h2>
            </div>
            <div className="weather-content">
              <img
                src={weatherIcon}
                alt={weatherDescription}
                className="weather-icon"
              />
              <h3>{weatherCondition}</h3>
              <p>{weatherDescription}</p>
              <p>Temperature: {temperature}°C</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchLocationResult;

import React, { useEffect, useState } from "react";
import "./Home.css";
import backgroundImage from "../../assets/images/imagehome.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GlobalAPI from "../../GlobalAPI"; // Import the API client
import { Link } from "react-router-dom";

const Home = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [articles, setArticles] = useState([]); // State to hold articles

  useEffect(() => {
    fetch("http://localhost:5000/weather")
      .then((response) => response.json())
      .then((data) => setWeatherData(data));

    // Fetch articles
    const fetchArticles = async () => {
      try {
        const data = await GlobalAPI.getNewsArticles();
        setArticles(data.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div
      className="home"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header />
      <div className="main-content">
        <div className="articles-grid">
          {articles.slice(0, 4).map((article) => (
            <div key={article.id} className="article-card">
              <img
                src={article.attributes.Image.data.attributes.url}
                alt={article.attributes.Heading}
                className="article-image"
              />
              <h3 className="article-title">
                <Link to={`/news/${article.id}`}>
                  {article.attributes.Heading}
                </Link>
              </h3>
            </div>
          ))}
        </div>
        <div className="weather-container">
          <h2>Weather beside you.</h2>
          <div className="weather-cards">
            {weatherData.map((weather, index) => (
              <div className="weather-card" key={index}>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className="weather-icon"
                />
                <div className="weather-info">
                  <p className="condition">{weather.weather[0].main}</p>
                  <p className="location">{weather.name}</p>
                  <p className="temp">{weather.main.temp}°C</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

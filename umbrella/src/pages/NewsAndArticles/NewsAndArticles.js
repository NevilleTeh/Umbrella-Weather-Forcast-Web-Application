import React, { useEffect, useState } from "react";
import "./NewsAndArticles.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GlobalAPI from "../../GlobalAPI";
import { Link } from "react-router-dom";

const NewsAndArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
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
      className="news-and-articles"
      style={{
        backgroundImage: `url(${require("../../assets/images/imagehome.png")})`,
      }}
    >
      <Header />
      <div className="main-content">
        <h2>News and Articles</h2>
        <div className="articles-grid">
          {articles.map((article) => (
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
      </div>
      <Footer />
    </div>
  );
};

export default NewsAndArticles;

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GlobalAPI from "../../GlobalAPI";
import "./ArticleDetail.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await GlobalAPI.getNewsArticleById(id); // Add this method in GlobalAPI
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [id]);

  const handleShareClick = () => {
    setShowShareOptions(!showShareOptions);
  };

  const currentUrl = window.location.href;

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="article-detail"
      style={{
        backgroundImage: `url(${require("../../assets/images/imagehome.png")})`,
      }}
    >
      <Header />
      <div className="main-content">
        <div className="breadcrumbs">
          <Link to="/">Home</Link> &gt;{" "}
          <Link to="/news">News and Articles</Link> &gt;{" "}
          {article.attributes.Heading}
        </div>
        <img
          src={article.attributes.Image.data.attributes.url}
          alt={article.attributes.Heading}
          className="banner-image"
        />
        <h1 className="article-heading">{article.attributes.Heading}</h1>
        <p className="article-description">{article.attributes.Description}</p>
        <div className="button-container">
          <button className="share-button" onClick={handleShareClick}>
            Share
          </button>
          <button className="back-button" onClick={() => navigate("/news")}>
            Back to News
          </button>
        </div>
        {showShareOptions && (
          <div className="share-options">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="share-icon" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="share-icon" />
            </a>
            <a
              href={`https://www.instagram.com/?url=${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="share-icon" />
            </a>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ArticleDetail;

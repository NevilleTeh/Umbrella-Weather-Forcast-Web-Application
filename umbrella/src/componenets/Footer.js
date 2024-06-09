import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import waveImage from "../assets/images/wave3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  const handleSubscribe = () => {
    if (!email || !location) {
      alert("Please enter both your email and location.");
      return;
    }

    // Logic to send subscription data to the backend
    fetch("http://localhost:5000/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, location }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Subscription successful! Check your email for updates.");
        setEmail("");
        setLocation("");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Subscription failed. Please try again.");
      });
  };

  return (
    <footer className="footer">
      <div className="wave-container">
        <img src={waveImage} alt="Wave" className="wave" />
      </div>
      <div className="footer-top">
        <Link to="/">
          <h1 className="footer-logo">UMbrella</h1>
        </Link>
        <div className="social-icons">
          <a
            href="https://www.facebook.com/profile.php?id=61560170387326&mibextid=LQQJ4d"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a
            href="https://x.com/UMbrellaNev123"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="https://www.instagram.com/umbrella12321?igsh=cHFxMGwzNjh3NGYz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
      <div className="horizontal-line"></div>
      <div className="footer-content">
        <div className="footer-right">
          <p className="newsletter-title">Subscribe Newsletter</p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your city"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          Get weather alerts, special news, and updates straight to your inbox
        </p>
      </div>
    </footer>
  );
};

export default Footer;

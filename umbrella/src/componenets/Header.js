import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";
import logo from "../assets/images/UMbrellaLogo.png";
import searchIcon from "../assets/images/searchbar.png";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (searchQuery.trim() !== "") {
        navigate(`/search?query=${searchQuery}`);
      }
    }
  };

  const handleLocationSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (locationQuery.trim() !== "") {
        navigate(`/search-location?location=${locationQuery}`);
      }
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/">
          <img src={logo} alt="UMbrella Logo" className="logo" />
        </Link>
        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search location"
              className="search-input"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              onKeyPress={handleLocationSearch}
            />
            <button className="search-button" onClick={handleLocationSearch}>
              <img src={searchIcon} alt="Search Icon" className="search-icon" />
            </button>
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search for news"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
            />
            <button className="search-button" onClick={handleSearch}>
              <img src={searchIcon} alt="Search Icon" className="search-icon" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

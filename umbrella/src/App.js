import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NewsAndArticles from "./pages/NewsAndArticles/NewsAndArticles";
import ArticleDetail from "./pages/NewsAndArticles/ArticleDetail";
import SearchResults from "./pages/SearchResults/SearchResults";
import SearchLocationResult from "./pages/SearchLocationResult/SearchLocationResult";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/news" element={<NewsAndArticles />} />
        <Route path="/news/:id" element={<ArticleDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/search-location" element={<SearchLocationResult />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import UrlShortener from "./UrlShortener";
import Analytics from "./Analytics";
import "../App.css"; // Updated path
import backgroundImg from "../background.png"; // Replace with your background image path

const App = () => {
  return (
    <div
      className="app-container"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="overlay"></div>
      <div className="content">
        <UrlShortener />
        <Analytics />
      </div>
    </div>
  );
};

export default App;

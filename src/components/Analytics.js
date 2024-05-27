import React, { useState } from "react";
import axios from "axios";
import "../Analytics.css";

const Analytics = () => {
  const [shortId, setShortId] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.get(
        process.env.REACT_SERVER || `http://localhost:8001`+`/url/analytics/${shortId}`
      );
      setAnalytics(response.data);
    } catch (error) {
      console.error("Error fetching analytics", error);
      setError("Failed to fetch analytics. Please try again.");
    }
  };

  return (
    <div className="analytics-container">
      <h1>URL Analytics</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter short URL ID"
          value={shortId}
          onChange={(e) => setShortId(e.target.value)}
          required
        />
        <button type="submit">Get Analytics</button>
      </form>
      {error && <p className="error">{error}</p>}
      {analytics && (
        <div className="result">
          <p>Total Clicks: {analytics.totalClicks}</p>
          <ul>
            {analytics.analytics.map((entry, index) => (
              <li key={index}>{new Date(entry.timestamp).toLocaleString()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Analytics;

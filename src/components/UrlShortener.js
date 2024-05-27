import React, { useState } from 'react';
import axios from 'axios';
import '../UrlShortener.css'; // Assuming you have a separate CSS file

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    setCopied(false); // Reset copied state
    try {
      const response = await axios.post('http://localhost:8001/url', { url }); // Replace with your actual backend API URL
      console.log('API response:', response.data); // Add logging
      setShortUrl(`http://localhost:8001/${response.data.id}`); // Replace "vercel" with your desired domain placeholder
    } catch (error) {
      console.error('Error generating short URL', error);
      setError('Failed to shorten the URL. Please try again.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
      .then(() => {
        setCopied(true);
      })
      .catch(err => {
        console.error('Failed to copy the URL', err);
        setError('Failed to copy the URL.');
      });
  };

  return (
    <div className="url-shortener-container">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter your URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten</button>
      </form>
      {error && <p className="error">{error}</p>}
      {shortUrl && (
        <div className="result">
          <p>Shortened URL:</p>
          <div className="short-url-container">
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
            <button onClick={handleCopy} className="copy-button">
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;

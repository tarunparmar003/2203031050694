import React, { useState } from "react";
import UrlInputGroup from "./urlinputgroup";
import ShortenButton from "./shortenbutton";
import ResultList from "./resultlist";
import "./styles.css";

export default function UrlShortener() {
  const [urls, setUrls] = useState(["", "", "", "", ""]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (index, value) => {
    const updated = [...urls];
    updated[index] = value;
    setUrls(updated);
  };

  const shortenUrls = async () => {
    setError("");
    setLoading(true);
    setResults([]);

    const validUrls = urls.filter((url) => url.trim() !== "");

    try {
      const promises = validUrls.map((url) =>
        fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`)
          .then((res) => res.json())
          .then((data) =>
            data.ok ? { original: url, short: data.result.full_short_link } : { original: url, short: "Error" }
          )
          .catch(() => ({ original: url, short: "Error" }))
      );

      const shortened = await Promise.all(promises);
      setResults(shortened);
    } catch {
      setError("Failed to shorten URLs. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="url-shortener-container">
      <h1 className="title">🔗 URL Shortener (Max 5 URLs)</h1>
      <UrlInputGroup urls={urls} handleChange={handleChange} />
      <ShortenButton onClick={shortenUrls} loading={loading} />
      {error && <p className="error">{error}</p>}
      <ResultList results={results} />
    </div>
  );
}

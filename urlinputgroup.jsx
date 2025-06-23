import React from "react";

export default function UrlInputGroup({ urls, handleChange }) {
  return (
    <div className="url-input-group">
      {urls.map((url, idx) => (
        <input
          key={idx}
          type="text"
          value={url}
          onChange={(e) => handleChange(idx, e.target.value)}
          placeholder={`Enter URL ${idx + 1}`}
          className="url-input"
        />
      ))}
    </div>
  );
}

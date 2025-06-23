import React from "react";

export default function ResultList({ results }) {
  if (!results.length) return null;

  return (
    <div className="result-list">
      {results.map((res, idx) => (
        <div key={idx} className="result-item">
          <span><strong>{res.original}</strong> ➝ </span>
          {res.short === "Error" ? (
            <span className="text-red-500">Error</span>
          ) : (
            <a href={res.short} target="_blank" rel="noopener noreferrer" className="result-link">
              {res.short}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

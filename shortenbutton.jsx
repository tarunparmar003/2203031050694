import React from "react";

export default function ShortenButton({ onClick, loading }) {
  return (
    <button onClick={onClick} disabled={loading} className="shorten-button">
      {loading ? "Shortening..." : "Shorten URLs"}
    </button>
  );
}

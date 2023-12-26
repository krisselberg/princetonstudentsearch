"use client";

import { useState } from "react";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    if (!response.ok) {
      throw new Error("API response not OK");
    }

    let data = [];
    if (response.headers.get("content-type")?.includes("application/json")) {
      data = await response.json();
    }

    setResults(Array.isArray(data) ? data : []);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          // make text color black
          className="input mr-2"
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <div>
        {results.map((result, index) => (
          <div key={index} className="card">
            <h3 className="font-bold text-lg">
              {result.firstName} {result.lastName}
            </h3>
            <p>Email: {result.email}</p>
            <p>
              <a
                href={result.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            </p>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;

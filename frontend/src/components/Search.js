"use client";

import { useState } from "react";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }
    );
    const data = await response.json();
    setResults(data);
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
          className="border border-gray-300 p-2 mr-2 rounded text-black"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>
      <div className="w-full max-w-md">
        {results.map((result, index) => (
          <div
            key={index}
            className="bg-white text-black p-5 my-2 shadow-lg rounded"
          >
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

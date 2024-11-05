import React, { useEffect, useState } from "react";
import axios from "axios";
import usePrevState from "./hooks/usePrevState";

const App = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const prevTerm = usePrevState(term);

  useEffect(() => {
    const search = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://en.wikipedia.org/w/api.php", {
          params: {
            action: "query",
            list: "search",
            origin: "*",
            format: "json",
            srsearch: term,
          },
        });
        setResults(response.data.query.search);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
      setLoading(false);
    };

    if (term && term !== prevTerm) {
      const debounceSearch = setTimeout(() => {
        search();
      }, 1200);

      return () => clearTimeout(debounceSearch);
    }
  }, [term, prevTerm]);

  return (
    <div className="container">
      <label htmlFor="searchInput" className="form-label">
        Search Wikipedia
      </label>
      <input
        type="text"
        className="form-control"
        id="searchInput"
        placeholder="Enter search term"
        onChange={(e) => setTerm(e.target.value)}
        value={term}
      />

      <div className="table-container">
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : results.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={result.pageid}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <a
                      href={`https://en.wikipedia.org/wiki/${encodeURIComponent(
                        result.title
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {result.title}
                    </a>
                  </td>
                  <td>
                    <span
                      dangerouslySetInnerHTML={{ __html: result.snippet }}
                    ></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <p>Start typing to search Wikipedia!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

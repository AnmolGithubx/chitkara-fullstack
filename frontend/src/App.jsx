import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      setError("");

      const data = input
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item);

      const res = await axios.post(
        "http://localhost:3000/bfhl",
        { data }
      );

      setResponse(res.data);
    } catch (err) {
      setError("Failed to connect to API");
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>🌳 Graph Hierarchy Analyzer</h1>
        <p className="subtitle">
          Chitkara Full Stack Challenge
        </p>

        <textarea
          rows="6"
          placeholder="Example: A->B, A->C, B->D"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={submit}>
          Analyze Graph
        </button>

        {error && (
          <div className="error-card">
            {error}
          </div>
        )}

        {response && (
          <>
            <div className="summary-grid">
              <div className="card">
                <h3>Total Trees</h3>
                <p>{response.summary.total_trees}</p>
              </div>

              <div className="card">
                <h3>Total Cycles</h3>
                <p>{response.summary.total_cycles}</p>
              </div>

              <div className="card">
                <h3>Largest Root</h3>
                <p>
                  {response.summary.largest_tree_root || "-"}
                </p>
              </div>
            </div>

            <div className="section">
              <h2>🌳 Hierarchies</h2>

              {response.hierarchies.map(
                (hierarchy, index) => (
                  <div
                    key={index}
                    className="hierarchy-card"
                  >
                    <h3>
                      Root: {hierarchy.root}
                    </h3>

                    {hierarchy.has_cycle ? (
                      <div className="cycle">
                        ⚠ Cycle Detected
                      </div>
                    ) : (
                      <>
                        <p>
                          Depth:{" "}
                          {hierarchy.depth}
                        </p>

                        <pre>
                          {JSON.stringify(
                            hierarchy.tree,
                            null,
                            2
                          )}
                        </pre>
                      </>
                    )}
                  </div>
                )
              )}
            </div>

            <div className="section-row">
              <div className="list-card">
                <h2>
                  ❌ Invalid Entries
                </h2>

                {response.invalid_entries
                  .length ? (
                  <ul>
                    {response.invalid_entries.map(
                      (item, index) => (
                        <li key={index}>
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p>None</p>
                )}
              </div>

              <div className="list-card">
                <h2>
                  📄 Duplicate Edges
                </h2>

                {response.duplicate_edges
                  .length ? (
                  <ul>
                    {response.duplicate_edges.map(
                      (item, index) => (
                        <li key={index}>
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p>None</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
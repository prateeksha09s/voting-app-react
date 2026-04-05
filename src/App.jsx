import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [c1, setC1] = useState(() => Number(localStorage.getItem("c1")) || 0);
  const [c2, setC2] = useState(() => Number(localStorage.getItem("c2")) || 0);
  const [c3, setC3] = useState(() => Number(localStorage.getItem("c3")) || 0);
  const [leader, setLeader] = useState("");

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("c1", c1);
    localStorage.setItem("c2", c2);
    localStorage.setItem("c3", c3);
  }, [c1, c2, c3]);

  // Leader logic
  useEffect(() => {
    if (c1 > c2 && c1 > c3) setLeader("Candidate 1");
    else if (c2 > c3 && c2 > c1) setLeader("Candidate 2");
    else if (c3 > c1 && c3 > c2) setLeader("Candidate 3");
    else setLeader("No one");
  }, [c1, c2, c3]);

  // Reset
  const handleReset = () => {
    setC1(0);
    setC2(0);
    setC3(0);
    setLeader("");
    localStorage.clear();
  };

  // Images
  const images = {
    "Candidate 1": "/profile.jpg",
    "Candidate 2": "/emp6.png",
    "Candidate 3": "/brain.jpg"
  };

  // ✅ NEW: Percentage logic
  const total = c1 + c2 + c3;

  const getPercent = (votes) => {
    return total === 0 ? 0 : ((votes / total) * 100).toFixed(1);
  };

  return (
    <div className="app-container">
      <h2>Voting App</h2>

      {/* Buttons */}
      <div className="button-row">
        <button onClick={() => setC1(c1 + 1)}>Vote Candidate 1</button>
        <button onClick={() => setC2(c2 + 1)}>Vote Candidate 2</button>
        <button onClick={() => setC3(c3 + 1)}>Vote Candidate 3</button>
        <button onClick={handleReset} className="reset-btn">Reset</button>
      </div>

      {/* Candidates */}
      <div className="candidates-container">
        {["Candidate 1", "Candidate 2", "Candidate 3"].map((name, index) => {
          const votes = [c1, c2, c3][index];

          return (
            <div
              key={name}
              className={`candidate-box ${leader === name ? "winner" : ""}`}
            >
              <img src={images[name]} alt={name} />
              <h4>{name}</h4>

              <p>Votes: {votes}</p>
              <p>{getPercent(votes)}%</p>

              {/* Progress Bar */}
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${getPercent(votes)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leader */}
      <h3>Current Leader: {leader}</h3>

      {leader !== "No one" && (
        <>
          <h3 style={{ color: "gold" }}>🏆 {leader} is leading!</h3>
          <img src={images[leader]} alt={leader} className="leader-image" />
        </>
      )}
    </div>
  );
}

export default App;
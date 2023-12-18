import { useState } from "react";
import "./App.css";

// Header component for the title and feedback prompt
const Header = () => {
  return (
    <>
      <h1 className="header">
        Un<span className="highlight xl">i</span>cafe
      </h1>
      <h2>Please leave your feedback!</h2>
    </>
  );
};

// Button component for interactive buttons
const Button = ({ handleClick, name }) => (
  <button onClick={() => handleClick(name)}>{name}</button>
);

// Statistics component to display feedback counters
const Statistics = ({ good, neutral, bad, total }) => {
  return (
    <div className="counters">
      <StatisticLine text="Good" value={good} total={total} />
      <StatisticLine text="Neutral" value={neutral} total={total} />
      <StatisticLine text="Bad" value={bad} total={total} />
    </div>
  );
};

// StatisticLine component for individual feedback statistics
const StatisticLine = ({ text, value, total, name }) => {
  return (
    <div className="label">
      <h2>{text}</h2>
      <h1>{value}</h1>
      {value > 0 && (
        <h3 className={text}>{((value / total) * 100).toFixed(0)}%</h3>
      )}
    </div>
  );
};

// MoreStats component for additional statistics (total, average, positive percentage)
const MoreStats = ({ average, good, total }) => {
  return (
    <div className="statistics">
      {total > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>
                <b>More Stats</b>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Total: <b>{total}</b>
              </td>
            </tr>
            <tr>
              <td>
                Average Score: <b>{average.toFixed(2)}</b>
              </td>
            </tr>
            <tr>
              <td>
                Positive Percentage:{" "}
                <b> {((good / total) * 100).toFixed(0)}%</b>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        "No Feedback Given"
      )}
    </div>
  );
};

// Main App component
function App() {
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Function to handle button clicks
  function handleClick(name) {
    if (name === "Reset") {
      setName("");
      setTotal(0);
      setGood(0);
      setNeutral(0);
      setBad(0);
      setAverage(0);
    } else {
      const feedbackValue = name === "Good" ? 1 : name === "Bad" ? -1 : 0;
      setName(name);
      setTotal(total + 1);
      setGood(name === "Good" ? good + 1 : good);
      setNeutral(name === "Neutral" ? neutral + 1 : neutral);
      setBad(name === "Bad" ? bad + 1 : bad);
      setAverage((total * average + feedbackValue) / (total + 1));
    }
  }

  return (
    <div className="container">
      <Header />
      <Button className={name} handleClick={handleClick} name={"Good"} />
      <Button className={name} handleClick={handleClick} name={"Neutral"} />
      <Button className={name} handleClick={handleClick} name={"Bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
      <MoreStats average={average} good={good} total={total} />
      <Button name="Reset" handleClick={handleClick} />
    </div>
  );
}

export default App;

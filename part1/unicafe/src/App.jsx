import { useState } from "react";
import "./App.css";
import { anecdotes } from "./anecdotes";

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

// Anecdote component for displaying a daily anecdote and voting information
const Anecdote = ({ selected, voteArr, handleGetAnecdote, handleVote }) => {
  let largest = Math.max(...voteArr);
  let index = voteArr.indexOf(largest);

  return (
    <div className="anecdote">
      {selected !== null && (
        <>
        <h2 className="header">Anecdote of the day</h2>
          <p>
            <span className="highlight">"</span>
            {anecdotes[selected]}
            <span className="highlight">"</span>
          </p>

          <p>
            Voted for <span className="highlight">{voteArr[selected]}</span>{" "}
            times
          </p>
        </>
      )}
      <Button
        name={!selected ? "Get Anecdote" : "New Anecdote"}
        handleClick={handleGetAnecdote}
      />
      {selected !== null && <Button name="Vote" handleClick={handleVote} />}
      {largest > 0 && (
        <div>
          <h2 className="header">Most Voted For</h2>
          {anecdotes[index]}
          <p>
            Voted for <span className="highlight">{largest}</span> times
          </p>
        </div>
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
  const [selected, setSelected] = useState(null);
  const [voteArr, setVoteArr] = useState(Array(anecdotes.length).fill(0));

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

  // Function to get a random anecdote
  function handleGetAnecdote() {
    let randIndex = Math.floor(Math.random() * (anecdotes.length - 1 - 0) + 0);
    setSelected(randIndex);
  }

  // Function to handle voting
  function handleVote() {
    let copy = [...voteArr];
    copy[selected] += 1;
    setVoteArr(copy);
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
      <Anecdote
        selected={selected}
        voteArr={voteArr}
        handleGetAnecdote={handleGetAnecdote}
        handleVote={handleVote}
      />
      
    </div>
  );
}

export default App;

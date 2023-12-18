import { useState } from 'react'
import './App.css'
import { anecdotes } from "./anecdotes";

const Button = ({ handleClick, name }) => (
  <button onClick={() => handleClick(name)}>{name}</button>
);

const Anecdote = ({ selected, voteArr, handleGetAnecdote, handleVote }) => {
  let largest = Math.max(...voteArr);
  let index = voteArr.indexOf(largest);

  return (
    <div className="anecdote">
      {selected !== null && (
        <>
          <h1 className="header">Anecdote of the day</h1>
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

function App() {
  const [selected, setSelected] = useState(null);
  const [voteArr, setVoteArr] = useState(Array(anecdotes.length).fill(0));

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
    <>
      <Anecdote
        selected={selected}
        voteArr={voteArr}
        handleGetAnecdote={handleGetAnecdote}
        handleVote={handleVote}
      />
    </>
  )
}

export default App

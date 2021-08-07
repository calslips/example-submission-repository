import React, { useState } from 'react';

const DisplayVote = ({voteCount}) => {
  if (voteCount === 1) {
    return (
      <p>has {voteCount} vote</p>
    );
  }
  return (
    <p>has {voteCount} votes</p>
  );
};

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is the same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(7).fill(0));
  const copy = [...points];
  const randomIndex = () => Math.floor(Math.random() * anecdotes.length);
  const updatePoints = () => {
    copy[selected] += 1;
    setPoints(copy);
  };
  const checkPoints = () => {
    let highestIndex = 0;
    let current = copy[highestIndex];
    for (let i = 1; i < copy.length; i++) {
      if (copy[i] > current) {
        current = copy[i];
        highestIndex = i;
      }
      continue;
    }
    return highestIndex;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <DisplayVote voteCount={points[selected]} />
      <Button handleClick={() => updatePoints()} text='vote' />
      <Button handleClick={() => setSelected(randomIndex)} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[checkPoints()]}</p>
      <DisplayVote voteCount={points[checkPoints()]} />
    </div>
  );
}

export default App;

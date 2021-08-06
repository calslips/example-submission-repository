import React, { useState } from 'react';

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const DisplayEachFeedback = ({text, amount}) => (
  <p>{text} {amount}</p>
)

const AllFeedback = ({total}) => (
  <p>all {total}</p>
)

const AverageScore = ({good, bad, total}) => (
  <p>average {(good - bad) / total || 0}</p>
)

const PositiveFeedback = ({good, total}) => (
  <p>positive {(good / total) * 100 || 0} %</p>
)

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = (good + neutral + bad);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h1>statistics</h1>
      <DisplayEachFeedback text='good' amount={good} />
      <DisplayEachFeedback text='neutral' amount={neutral} />
      <DisplayEachFeedback text='bad' amount={bad} />
      <AllFeedback total={total} />
      <AverageScore good={good} bad={bad} total={total} />
      <PositiveFeedback good={good} total={total} />
    </div>
  );
}

export default App;

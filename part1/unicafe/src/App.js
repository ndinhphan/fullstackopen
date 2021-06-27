import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({text,value}) =>{
  return(
    <tr><td>{text}:{value}</td></tr>
  )
}
const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        no feedback yet!
      </div>
    )
  }
  const all = good+neutral+bad;
  const average = good*1+bad*-1;
  const positive = good*100/all;

  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleClick = (text) => {
    switch (text) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
    }
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={() => handleClick('good')} />
      <Button text='neutral' handleClick={() => handleClick('neutral')} />
      <Button text='bad' handleClick={() => handleClick('bad')} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


export default App
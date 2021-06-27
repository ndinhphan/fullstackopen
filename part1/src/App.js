import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [points,setPoints] = useState(new Array(anecdotes.length).fill(0))
  const handleClickAnecdote = (anecdotes) => {
    console.log("clicked, next number:",Math.floor(Math.random() * anecdotes.length));
    const previous = selected;
    let next = previous;
    while(next===previous) next = Math.floor(Math.random() * anecdotes.length)
    setSelected(next)
  }
  const handleClickVote = (selected) =>{
    const copy = [...points];
    copy[selected]++;
    setPoints(copy);
  }
  const findMostVote = (points)=>{
    // const most = Math.max([...points])
    console.log([...points])
    const indexOfMostVoted = points.indexOf(Math.max.apply(Math, [...points]));
    console.log("most voted: ",indexOfMostVoted);
    return indexOfMostVoted
  }
  // arr.indexOf(Math.max.apply(Math, arr))
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>has {points[selected]} votes</div>
      <div>
      <Button handleClick={()=>handleClickVote(selected)} text="vote" />
      <Button handleClick={()=>handleClickAnecdote(anecdotes)} text="random anecdote" />
      </div>
      
      <h1>Anecdote with most votes </h1>
      {anecdotes[findMostVote(points)]}
    </div>
  )
}


export default App
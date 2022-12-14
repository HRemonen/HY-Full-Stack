import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}> 
      {text} 
    </button>
  )
}

const Anecdote = ({text, times}) => {
  return (
    <>
      <p>{text}</p>
      <p>has {times} votes</p>
    </>
  )
}

const MostVotesAnecdote = ({anecdotes, points}) => {
  let mostPoints = 0
  let mostPointsIndex = 0
  const copyPoints = [...points]

  for (let i = 0; i < anecdotes.length; i++) {
    if (copyPoints[i] > mostPoints) {
      mostPoints = copyPoints[i]
      mostPointsIndex = i
    }
  }

  if (mostPoints === 0) {
    return <p>None of the anecdotes have been voted yet!</p>
  }
  
  return (
    <div>
      <h1>Most Voted Anecdote:</h1>
      <Anecdote text={anecdotes[mostPointsIndex]} times={mostPoints}/>
    </div>
    
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length))) 
  }

  const pointsHandler = () => {
    const copyPoints = [...points]
    copyPoints[selected] += 1
    setPoints(copyPoints)

    console.log(points)
  }  
  
  return (
    <div>
      <h1>Anecdote of the day:</h1>
      <Anecdote text={anecdotes[selected]} times={points[selected]}/>
      <Button onClick={pointsHandler} text="Vote this anecdote" />
      <Button onClick={randomAnecdote} text="Next anecdote" />
      <MostVotesAnecdote anecdotes={anecdotes} points={points}/>
    </div>
  )
}

export default App

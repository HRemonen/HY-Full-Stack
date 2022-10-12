import { useState } from 'react'

const Display = ({text, value}) => <p>{text} {value}</p>

const Button = ({ onClick, text }) => 
  <button onClick={onClick}> 
    {text} 
  </button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const positiveFeedback = () => {
    setGood(good + 1)
  }

  const neutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const badFeedback = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Unicafe feedback system</h1>
      <Button onClick={positiveFeedback} text="Good" />
      <Button onClick={neutralFeedback} text="Neutral" />
      <Button onClick={badFeedback} text="Bad" />

      <h1>Statistics</h1>
      <Display text={"Good: "} value={good}></Display>
      <Display text={"Neutral: "} value={neutral}></Display>
      <Display text={"Bad: "} value={bad}></Display>
    </div>
  )
}

export default App
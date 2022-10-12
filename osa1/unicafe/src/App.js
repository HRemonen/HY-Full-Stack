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
  const [totalClicks, setTotalClick] = useState(0)
  const [totalValue, setTotalValue] = useState(0)

  const increaseTotalClick = () => setTotalClick(totalClicks + 1)
  const alterTotalValue = (value) => setTotalValue(totalValue + value)

  const positiveFeedback = () => {
    setGood(good + 1)
    increaseTotalClick()
    alterTotalValue(1)
  }

  const neutralFeedback = () => {
    setNeutral(neutral + 1)
    increaseTotalClick()
  }

  const badFeedback = () => {
    setBad(bad + 1)
    increaseTotalClick()
    alterTotalValue(-1)
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
      <Display text={"All: "} value={totalClicks}></Display>
      <Display text={"Average: "} value={totalValue / totalClicks}></Display>
      <Display text={"Positive: "} value={((good / totalClicks) * 100) + " %" }></Display>
    </div>
  )
}

export default App
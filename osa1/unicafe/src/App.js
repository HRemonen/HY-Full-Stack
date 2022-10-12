import { useState } from 'react'

const StatisticLine = ({text, value}) => <p>{text} {value}</p>

const Button = ({onClick, text}) => 
  <button onClick={onClick}> 
    {text} 
  </button>

const Statistics = ({good, neutral, bad, totalClicks, totalValue}) => {
  if (totalClicks === 0) {
    return (
      <p>Cannot forge statistics. No feedbacks given yet!</p>
    )
  }
  return (
    <div>
      <StatisticLine text={"Good: "} value={good} />
      <StatisticLine text={"Neutral: "} value={neutral} />
      <StatisticLine text={"Bad: "} value={bad}/>
      <StatisticLine text={"All: "} value={totalClicks} />
      <StatisticLine text={"Average: "} value={totalValue / totalClicks} />
      <StatisticLine text={"Positive: "} value={((good / totalClicks) * 100) + " %" } />
    </div>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad} totalClicks={totalClicks} totalValue={totalValue} />
    </div>
  )
}

export default App
const Header = (props) => {
  return (
    <div>
      <h1>Course name: {props.course}</h1>
    </div>
  )
}

const Part = (props) => (
  <div>
    <h3>
      Part name: {props.name}
    </h3>
    <p>
      Number of exercises: {props.exercises}
    </p>
    
  </div>
  
)

const Content = (props) => {
  return (
    <div>
      {props.parts.map((x) => 
        <Part name={x.name} exercises={x.exercises}/>
        )}
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Total number of exercises: {
          props.parts[0].exercises + 
          props.parts[1].exercises + 
          props.parts[2].exercises}</p>
    </div>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
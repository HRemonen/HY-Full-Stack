function formatName(user) {
  return user.firstName + ' ' + user.lastName
}

function getGreeting(user) {
  if (user) {
    return <p>Hello, {formatName(user)}!</p>
  }
  return <p>Hello, Stranger.</p>
}

const user = {
  firstName: 'Henri',
  lastName: 'Remonen'
}

const Footer = () => {
  return (
    <div>
      <p>app created by</p>
      <a href="https://github.com/HRemonen">Henri Remonen</a>
    </div> 
  )
}

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  )
}

const App = () => {
  console.log('Hello from componentti')
  const now = new Date()
  const a = 10
  const b = 20

  return(  
    <div>
      <p>{getGreeting()}</p>
      <p>{getGreeting(user)}</p>
      <Hello name="Hellon sisältä" age={a}/>
      <div>
        <Footer />
      </div>
    </div>
    
  )
}


export default App

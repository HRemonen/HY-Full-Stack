import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import RenderBlogs from './components/RenderBlogs'
import Logout from './components/Logout'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsernameInput = async (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordInput = async (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`Logging in user ${username}`)

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
    }
    catch (exception) {
      console.log('Wrong credentials!')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      {user === null && 
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsernameInput={handleUsernameInput}
          handlePasswordInput={handlePasswordInput} 
        />}

      {!(user === null) &&
        <>
          <Logout user={user} handleLogout={handleLogout} />
          <RenderBlogs
            user={user}
            blogs={blogs}
          />
          </>}
    </div>
  )
}

export default App

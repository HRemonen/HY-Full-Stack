import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import RenderBlogs from './components/RenderBlogs'
import Notification from './components/Notification'
import Logout from './components/Logout'
import CreateBlogForm from './components/CreateBlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  const [user, setUser] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 5000)
  }, [message])

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

  const handleBlogCreation = async (blog) => {
    console.log(`Creating new blog: ${blog}`)
    
    try {
      await blogService.create(blog)
      setBlogs(blogs.concat(blog))

      setMessage(`Added a new blog: '${blog.title}' by ${blog.author}`)
      setMessageType('success-msg')
    }
    catch (exception) {
      setMessage("Blog creation failed, check all values")
      setMessageType('error-msg')
    }
  }

  const handleLogin = async (username, password) => {
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

      setMessage(`Logged in as user: ${user.name}`)
      setMessageType('success-msg')
    }
    catch (exception) {
      setMessage('Wrong username or password')
      setMessageType('error-msg')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setMessage('Successfully logged out')
    setMessageType('warning-msg')
  }

  return (
    <div>
      <Notification message={message} type={messageType}/>
      {user === null && 
        <LoginForm
          handleLogin={handleLogin}
        />
      }

      {!(user === null) &&
        <>
          <Logout user={user} handleLogout={handleLogout} />
          <h1>blogs</h1>
          <CreateBlogForm
            handleBlogCreation={handleBlogCreation}
          />
          <RenderBlogs
            user={user}
            blogs={blogs}
          />
        </>
      }
    </div>
  )
}

export default App

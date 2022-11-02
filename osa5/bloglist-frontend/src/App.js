import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import RenderBlogs from './components/RenderBlogs'
import Notification from './components/Notification'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

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
      blogFormRef.current.toggleVisibility()

      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))

      setMessage(`Added a new blog: '${blog.title}' by ${blog.author}`)
      setMessageType('success-msg')
    }
    catch (exception) {
      setMessage("Blog creation failed, check all values")
      setMessageType('error-msg')
    }
  }

  const handleBlogLike = async (blog) => {
    try {
      blog = {...blog, likes: blog.likes + 1}
      
      const updatedBlog = await blogService.update(blog.id, blog)
      setBlogs(blogs.map(oldBlog => {
        return oldBlog.id === updatedBlog.id
          ? updatedBlog
          : oldBlog
      }))
    }

    catch (exception) {
      setMessage("Something went wrong")
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
          <h1>blogs</h1>
          <Logout user={user} handleLogout={handleLogout} />
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm
              handleBlogCreation={handleBlogCreation}
            />
          </Togglable>
          <RenderBlogs
            user={user}
            blogs={blogs}
            handleBlogLike={handleBlogLike}
          />
        </>
      }
    </div>
  )
}

export default App

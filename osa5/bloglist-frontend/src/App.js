import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import RenderBlogs from './components/RenderBlogs'
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
    }
    catch (exception) {
      console.log('Something went wrong creating new blog')
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
    }
    catch (exception) {
      console.log('Wrong credentials!')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
    <div>
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

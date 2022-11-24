import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux'

import Logout from "./components/Logout";
import BlogForm from "./components/CreateBlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import RenderBlogs from "./components/RenderBlogs";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";

import { newNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    console.log(`Logging in user ${username}`);

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);

      dispatch(newNotification(`Logged in as user: ${user.name}`));
    } catch (exception) {
      dispatch(newNotification("Wrong username or password"));
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    dispatch(newNotification("Successfully logged out"));
  };

  return (
    <div>
      <Notification />

      {user === null && <LoginForm handleLogin={handleLogin} />}

      {!(user === null) && (
        <>
          <h1>blogs</h1>
          <Logout user={user} handleLogout={handleLogout} />
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <RenderBlogs
            user={user}
          />
        </>
      )}
    </div>
  );
};

export default App;

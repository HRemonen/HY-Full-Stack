import { useState, useEffect, useRef } from "react";

import LoginForm from "./components/LoginForm";
import RenderBlogs from "./components/RenderBlogs";
import Notification from "./components/Notification";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

import { useDispatch } from 'react-redux'
import { newNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  const sortBlogs = (blogs) => {
    const sortedBlogs = blogs.sort((a, b) => {
      return b.likes - a.likes;
    });
    setBlogs(sortedBlogs);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => sortBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleBlogCreation = async (blog) => {
    console.log(`Creating new blog: ${blog}`);

    try {
      blogFormRef.current.toggleVisibility();

      const newBlog = await blogService.create(blog);
      sortBlogs(blogs.concat(newBlog));

      dispatch(newNotification(`Added a new blog: '${blog.title}' by ${blog.author}`));
    } catch (exception) {
      dispatch(newNotification("Blog creation failed, check all values"));
    }
  };

  const handleBlogLike = async (blog) => {
    try {
      blog = { ...blog, likes: blog.likes + 1 };

      const updatedBlog = await blogService.update(blog.id, blog);
      sortBlogs(
        blogs.map((oldBlog) => {
          return oldBlog.id === updatedBlog.id ? updatedBlog : oldBlog;
        })
      );
    dispatch(newNotification(`Liked '${blog.title}' by ${blog.author}`));
    } catch (exception) {
      dispatch(newNotification("Something went wrong"));
    }
  };

  const handleBlogDelete = async (blog) => {
    try {
      await blogService.remove(blog.id);
      sortBlogs(blogs.filter((oldBlog) => oldBlog.id !== blog.id));

      dispatch(newNotification("Blog deleted succesfully"));
    } catch (exception) {
      dispatch(newNotification("Unauthorized user. Cannot delete this blog."));
    }
  };

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
            <BlogForm handleBlogCreation={handleBlogCreation} />
          </Togglable>
          <RenderBlogs
            user={user}
            blogs={blogs}
            handleBlogLike={handleBlogLike}
            handleBlogDelete={handleBlogDelete}
          />
        </>
      )}
    </div>
  );
};

export default App;

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'

import Logout from "./components/Logout";
import BlogForm from "./components/CreateBlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import RenderBlogs from "./components/RenderBlogs";
import Notification from "./components/Notification";

import { initializeBlogs } from './reducers/blogReducer'
import { isLogged } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login)
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(isLogged())
    dispatch(initializeBlogs())
  }, [dispatch])


  return (
    <div>
      <Notification />

      {user === null && <LoginForm />}
      {!(user === null) && (
        <>
          <h1>blogs</h1>
          <Logout />
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <RenderBlogs />
        </>
      )}
    </div>
  );
};

export default App;
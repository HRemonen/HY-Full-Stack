import { useState } from "react";
import { useDispatch } from "react-redux";

import { likeBlog, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ user, blog }) => {
  const dispatch = useDispatch();
  const [view, setView] = useState(false);

  const checkOwner = blog.user.id === user.id || blog.user === user.id;

  const viewFullBlog = () => {
    return (
      <>
        <p>
          {blog.url} <br />
          likes {blog.likes}
          <button onClick={() => dispatch(likeBlog(blog))}>like</button> <br />
          {user.name} <br />
          {checkOwner && (
            <button onClick={() => dispatch(deleteBlog(blog))}>delete</button>
          )}
        </p>
      </>
    );
  };

  return (
    <div className="blog-wrapper">
      <div>
        <p>
          <b onClick={() => setView(!view)}>{blog.title}</b>, by: {blog.author}{" "}
          <br />
        </p>
        {view && viewFullBlog()}
      </div>
    </div>
  );
};

export default Blog;

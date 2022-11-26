import { useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { likeBlog, deleteBlog } from "../reducers/blogReducer";

const Blog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.authentication);
  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(b => b.id === match.params.id)
    : null

  if (!blog) return null

  const checkOwner = blog.user.id === user.id || blog.user === user.id;
  console.log('comments:', blog.comments)
  return (
    <div className="blog-wrapper">
      <h3>{ blog.title } { blog.author }</h3>
      <p>
        { blog.url } <br />
        likes { blog.likes }
        <button onClick={() => dispatch(likeBlog(blog))}>like</button> <br />
        added by { blog.user.name } <br />
        {checkOwner && (
          <button onClick={() => dispatch(deleteBlog(blog))}>delete</button>
        )}
      </p>
      <h3>Comments</h3>
      <ul className="comment-list">
        {blog.comments.map(comment => (
            <li key={ comment }>{ comment }</li>
          ))}
      </ul>
    </div>
  );
};

export default Blog;

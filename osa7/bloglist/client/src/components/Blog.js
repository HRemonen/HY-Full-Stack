import { useState } from "react";

const Blog = ({ user, blog, handleBlogLike, handleBlogDelete }) => {
  const [view, setView] = useState(false);

  const checkOwner = blog.user.id === user.id || blog.user === user.id;

  const viewFullBlog = () => {
    return (
      <>
        <p>
          {blog.url} <br />
          likes {blog.likes}
          <button onClick={() => handleBlogLike(blog)}>like</button> <br />
          {user.name} <br />
          {checkOwner && (
            <button onClick={() => handleBlogDelete(blog)}>delete</button>
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

import { useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";

import { likeBlog, commentBlog, deleteBlog } from "../../reducers/blogReducer";

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

  const handleSubmit = (comment) => {
    dispatch(commentBlog(blog, comment))
  }

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
      <div className="comment-section-wrapper">
        <Form
          onSubmit={handleSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <Field name="comment" >
                {({ input, meta }) => (
                  <div>
                    <input
                      {...input}
                      id="comment-input"
                      type="text"
                      name="comment"
                      placeholder="Write comment"
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <div className="comment-buttons">
                <button
                  className="create-btn"
                  type="submit"
                  disabled={submitting}
                >
                  Submit
                </button>
                <button
                  className="reset-btn"
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
          )}
        />
      </div>
      <ul className="comment-list">
        {blog.comments.map(comment => (
            <li key={ comment }>{ comment }</li>
          ))}
      </ul>
    </div>
  );
};

export default Blog;

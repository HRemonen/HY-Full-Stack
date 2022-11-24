import { useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'

import { newNotification } from '../reducers/notificationReducer'
import { createBlog } from "../reducers/blogReducer";

const CreateBlogForm = () => {
  const dispatch = useDispatch()

  const required = value => (value ? undefined : 'Required')

  const handleSubmit = async (blog) => {
    console.log(`Creating new blog: ${blog}`);

    dispatch(createBlog(blog))
    dispatch(newNotification(`Added a new blog: '${blog.title}' by ${blog.author}`));
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={ handleSubmit }>
            <Field name="title" validate={ required }>
              {({ input, meta }) => (
                <div>
                  <label>Title</label>
                  <input {...input} id="title-input" type="text" name="title" placeholder="Blog title"/>
                  {meta.error && meta.touched && <span>{ meta.error }</span>}
                </div>
              )}
            </Field>
            <Field name="author" validate={ required }>
              {({ input, meta }) => (
                <div>
                  <label>Author</label>
                  <input {...input} id="author-input" type="text" name="author" placeholder="Author name"/>
                  {meta.error && meta.touched && <span>{ meta.error }</span>}
                </div>
              )}
            </Field>
            <Field name="url" validate={ required }>
              {({ input, meta }) => (
                <div>
                  <label>Url</label>
                  <input {...input} id="url-input" type="text" name="url" placeholder="Blog url"/>
                  {meta.error && meta.touched && <span>{ meta.error }</span>}
                </div>
              )}
            </Field>
            <div className="blog-form-buttons">
              <button className="blog-create-btn" type="submit" disabled={submitting}>
                Submit
              </button>
              <button
                className="blog-reset-btn"
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
  );
};

export default CreateBlogForm;

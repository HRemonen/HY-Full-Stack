import PropTypes from 'prop-types'
import { useState } from 'react'

const CreateBlogForm = ({ handleBlogCreation }) => {
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })

  const handleSubmit = (event) => {
    event.preventDefault()

    handleBlogCreation(blog)
    setBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>title
            <input
              id="title-input"
              type="text"
              value={blog.title}
              name="title"
              onChange={({ target }) => setBlog({ ...blog, title: target.value })}
            />
          </label>
        </div>
        <div>
          <label>author
            <input
              id="author-input"
              type="text"
              value={blog.author}
              name="author"
              onChange={({ target }) => setBlog({ ...blog, author: target.value })}
            />
          </label>
        </div>
        <div>
          <label>url
            <input
              id="url-input"
              type="text"
              value={blog.url}
              name="url"
              onChange={({ target }) => setBlog({ ...blog, url: target.value })}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

CreateBlogForm.propTypes = {
  handleBlogCreation: PropTypes.func.isRequired
}

export default CreateBlogForm
import { useState } from 'react'

const Blog = ({blog}) => {
  const [view, setView] = useState(false)

  if (!view) {
    return (
      <div className='blogWrapper'>
        <div>
          <p onClick={() => setView(!view)}>
            <b>{blog.title}</b>, by: {blog.author}
          </p>
        </div>
      </div>  
    )
  }

  return (
    <div className='blogWrapper'>
      <div>
        <p>
          <b onClick={() => setView(!view)}>{blog.title}</b>, by: {blog.author} <br />
          {blog.url} <br />
          likes {blog.likes} <button type="">like</button> <br />
          {blog.user?.username}
        </p>
      </div>
    </div>
  )
}
  


export default Blog
import { useState } from 'react'


const Blog = ({ user, blog, handleBlogLike }) => {
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
          likes {blog.likes} 
            <button 
              onClick={() => handleBlogLike(blog)}>like
            </button> 
            <br />
          {user?.name}
        </p>
      </div>
    </div>
  )
}
  


export default Blog
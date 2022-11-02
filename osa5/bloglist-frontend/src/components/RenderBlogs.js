import Blog from './Blog'

const RenderBlogs = ({ user, blogs, handleBlogLike, handleBlogDelete }) => {
  return (
    <div>
      {blogs.map(blog => 
         <Blog 
            key={blog.id}
            user={user}
            blog={blog}
            handleBlogLike={handleBlogLike}
            handleBlogDelete={handleBlogDelete}
          />
      )}
      
    </div>
  )
}

export default RenderBlogs
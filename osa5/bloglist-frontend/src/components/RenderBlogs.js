import Blog from './Blog'

const RenderBlogs = ({ user, blogs, handleBlogLike }) => {
  return (
    <div>
      {blogs.map(blog => 
         <Blog 
            key={blog.id}
            user={user}
            blog={blog}
            handleBlogLike={handleBlogLike}
          />
      )}
      
    </div>
  )
}

export default RenderBlogs
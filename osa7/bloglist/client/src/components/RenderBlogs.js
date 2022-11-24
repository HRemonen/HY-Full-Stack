import { useSelector } from 'react-redux'
import Blog from "./Blog";

const RenderBlogs = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.authentication)

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default RenderBlogs;

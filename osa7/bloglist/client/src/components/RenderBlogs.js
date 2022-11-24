import { useSelector } from 'react-redux'
import Blog from "./Blog";

const RenderBlogs = ({ user }) => {
  const blogs = useSelector(state => state.blogs)
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

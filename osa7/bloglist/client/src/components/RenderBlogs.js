import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

const RenderBlogs = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div className="blog-list-wrapper">
      <ul className="blog-list">
        {blogs.map((blog) => (
          <li key={blog.id} className="blog-list-item">
            <Link to={`/blogs/${ blog.id }`}>{ blog.title } { blog.author }</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RenderBlogs;

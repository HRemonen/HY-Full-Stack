import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

const RenderBlogs = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div className="blog-list-wrapper">
      <ul className="blog-list">
        {blogs.map((blog) => (
          <li key={blog.id} >
            <div className="blog-list-item">
              <Link className="blog-link" to={`/blogs/${ blog.id }`}>{ blog.title }</Link>
              <div className="blog-info">
                <p>{ blog.likes } &#10084;</p>
                <p>{ blog.author }</p>
              </div>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RenderBlogs;

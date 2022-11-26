import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

const RenderUsers = () => {
  const users = useSelector((state) => state.users);
  console.log('users_render', users)

  return (
    <>
      <h2>Users</h2>
      <table className="user-table">
        <tbody>
          <tr>
            <th></th>
            <th><b>blogs created</b></th>
          </tr>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${ user.username }`}>{ user.username }</Link>
              </td>
              <td>{ user.blogs.length }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RenderUsers;
import { useSelector } from "react-redux";


const RenderUsers = () => {
  const users = useSelector((state) => state.users);

  return (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th><b>blogs created</b></th>
          </tr>
          {users.map(user => (
            <tr key={user.id}>
              <td>{ user.username }</td>
              <td>{ user.blogs.length }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RenderUsers;
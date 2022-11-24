import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from "../reducers/loginReducer";

const Logout = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  return (
    <div>
      <p>
        Logged in as {user.name} <br />
        <button onClick={() => dispatch(logoutUser())}>logout</button>
      </p>
    </div>
  );
};

export default Logout;

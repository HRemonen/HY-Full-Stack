import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/authReducer";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication);

  return (
    <div>
      <h1>Blogs</h1>
      <p>
        Logged in as {user.name} <br />
        <button className="logout-btn" onClick={() => dispatch(logoutUser())}>
          logout
        </button>
      </p>
    </div>
  );
};

export default Logout;

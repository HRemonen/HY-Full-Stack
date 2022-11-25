import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/authReducer";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication);

  return (
    <>
      Logged in as {user.username}
      <button className="logout-btn" onClick={() => dispatch(logoutUser())}>
        logout
      </button>
    </>
  );
};

export default Logout;

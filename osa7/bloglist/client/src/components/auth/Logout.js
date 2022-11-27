import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../reducers/authReducer";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication);

  return (
    <div>
      <p className="logged-user">{user.username}</p>
      <button className="logout-btn" onClick={() => dispatch(logoutUser())}>
        logout
      </button>
    </div>
  );
};

export default Logout;

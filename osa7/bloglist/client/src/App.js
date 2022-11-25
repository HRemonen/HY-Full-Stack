import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import MainRoutes from "./components/routes/Routes"

import { isLogged } from "./reducers/authReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(isLogged());
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <Router>
      <section className="primary">
        {user ? <MainRoutes /> : <LoginForm />}
      </section>
    </Router>
  );
};

export default App;
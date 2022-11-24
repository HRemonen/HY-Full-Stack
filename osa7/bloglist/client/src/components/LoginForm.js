import { useState } from "react";
import { useDispatch } from 'react-redux'

import { loginUser } from "../reducers/loginReducer";

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (username, password) => {
    dispatch(loginUser(username, password))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    handleLogin(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Log in to blogs</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

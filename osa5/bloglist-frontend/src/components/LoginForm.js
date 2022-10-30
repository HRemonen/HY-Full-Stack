const LoginForm = ({ username, password, handleLogin, handleUsernameInput, handlePasswordInput }) => {
  return (
    <div>
      <h2>Log in to blogs</h2>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameInput}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordInput}
          />
        </div>
        <button type="submit">login</button>
      </form> 
    </div>
  )
}

       

export default LoginForm
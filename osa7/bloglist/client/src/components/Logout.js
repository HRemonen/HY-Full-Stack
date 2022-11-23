const Logout = ({ user, handleLogout }) => {
  return (
    <div>
      <p>
        Logged in as {user.name}
        <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  );
};

export default Logout;

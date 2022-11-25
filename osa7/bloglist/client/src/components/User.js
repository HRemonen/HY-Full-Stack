import React from "react";
import { useMatch } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const users = useSelector((state) => state.users);
  const match = useMatch('/users/:name');
  const user = match
    ? users.find(u => u.username === match.params.name)
    : null
  
  console.log('users:', users)

  if (!user) return null;

  if (user.blogs.length === 0) return (
    <>
      <h3>User has no blogs</h3>
    </>
  )

  return (
    <div className="user-wrapper">
      <h3>{ user.name }</h3>
      <b>added blogs</b>
      <ul>
        {user.blogs.map(blog => (
          <li key={ blog.id }>{ blog.title }</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
import React from "react";
import { Link } from "react-router-dom"

import Logout from "./Logout";

const Navbar = () => {
  return (
    <>
      <div className="navigation-bar">
        <li>
          <Link to="/">blogs</Link>
        </li>
        <li>
          <Link to="/users">users</Link>
        </li>
        <li>
          <Logout />
        </li>
      </div>
      <div>
        <h2>Blogs app</h2>
      </div>
    </>
    
  )
}

export default Navbar;
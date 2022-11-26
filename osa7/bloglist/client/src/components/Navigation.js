import React from "react";
import { Link } from "react-router-dom"

import Logout from "./auth/Logout";

const Navbar = () => {
  return (
    <>
      <header className="navigation-bar">
        <nav>
          <li>
            <Link to="/">blogs</Link>
          </li>
          <li>
            <Link className="a" to="/users">users</Link>
          </li>
          <li>
            <Logout />
          </li>
        </nav>
      </header>
      <div>
        <h2>Blogs app</h2>
      </div>
    </>
    
  )
}

export default Navbar;
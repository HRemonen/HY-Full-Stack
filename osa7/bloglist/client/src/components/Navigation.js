import React from "react";
import { Link } from "react-router-dom"

import Logout from "./auth/Logout";

const Navbar = () => {
  return (
    <>
      <header className="navigation-bar">
        <nav>
          <li className="nav-list-item">
            <Link className="nav-link" to="/">blogs</Link>
          </li>
          <li className="nav-list-item">
            <Link className="nav-link" to="/users">users</Link>
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
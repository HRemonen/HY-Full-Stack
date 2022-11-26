import React from "react";
import { Routes, Route } from "react-router-dom"

import Index from "../pages/Index";
import Navbar from "../Navigation";
import Notification from "../misc/Notification";
import RenderUsers from "../user/RenderUsers"
import User from "../user/User";
import Blog from "../blog/Blog";

const MainRoutes = () => {
  return (
    <>
      <Navbar />
      <Notification />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/blogs/:id" element={<Blog />}/>
        <Route path="/users" element={<RenderUsers />} />
        <Route path="/users/:name" element={<User />} />
      </Routes>
    </>
  )
}

export default MainRoutes
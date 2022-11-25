import React from "react";
import { Routes, Route } from "react-router-dom"

import Index from "../pages/Index";
import Navbar from "../Navigation";
import Notification from "../Notification";
import RenderUsers from "../RenderUsers"
import User from "../User";

const MainRoutes = () => {
  return (
    <>
      <Navbar />
      <Notification />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/users" element={<RenderUsers />} />
        <Route path="/users/:name" element={<User />} />
      </Routes>
    </>
  )
}

export default MainRoutes
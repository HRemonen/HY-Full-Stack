import React from "react";
import { Routes, Route } from "react-router-dom"

import RenderUsers from "../RenderUsers"
import Index from "../pages/Index";
import Notification from "../Notification";
import Logout from "../Logout";

const MainRoutes = () => {
  return (
    <>
      <Logout />
      <Notification />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/users" element={<RenderUsers />} />

        <Route path="/users/:id"/>
      </Routes>
    </>
  )
}

export default MainRoutes
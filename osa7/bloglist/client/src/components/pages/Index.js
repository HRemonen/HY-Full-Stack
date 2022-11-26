import React, { useRef } from "react";

import CreateBlogForm from "../blog/CreateBlogForm"
import Togglable from "../misc/Togglable";
import RenderBlogs from "../blog/RenderBlogs";

const Index = () => {
  const blogFormRef = useRef()
  return (
    <>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <CreateBlogForm />
      </Togglable>
      <RenderBlogs />
    </>
  )
}

export default Index
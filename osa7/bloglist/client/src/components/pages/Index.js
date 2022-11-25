import React, { useRef } from "react";

import CreateBlogForm from "../CreateBlogForm"
import Togglable from "../Togglable";
import RenderBlogs from "../RenderBlogs";


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
import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    like(state, action) {
      const id = action.payload.id;

      const blogToLike = state.find((b) => b.id === id);

      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1,
      };

      return state.map((blog) => {
        return blog.id !== id ? blog : likedBlog;
      });
    },
    remove(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    append(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { like, append, setBlogs, remove } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();

    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(append(newBlog));
  };
};

export const likeBlog = (content) => {
  return async (dispatch) => {
    const blog = await blogService.update(content);
    dispatch(like(blog));
  };
};

export const deleteBlog = (content) => {
  return async (dispatch) => {
    await blogService.remove(content.id);
    dispatch(remove(content.id));
  };
};

export default blogSlice.reducer;

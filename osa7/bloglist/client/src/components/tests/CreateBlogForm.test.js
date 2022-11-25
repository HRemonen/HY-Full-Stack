import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlogForm from "./BlogForm";

test("BlogCreateForm updates parent state and calls on submit", async () => {
  const user = userEvent.setup();
  const createBlog = jest.fn();

  render(<CreateBlogForm handleBlogCreation={createBlog} />);

  const titleInput = screen.getByLabelText("title");
  const authorInput = screen.getByLabelText("author");
  const urlInput = screen.getByLabelText("url");
  const createButton = screen.getByText("create");

  await user.type(titleInput, "Kalevin testi");
  await user.type(authorInput, "Kalvi");
  await user.type(urlInput, "www.kalevinkelvi.net");
  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  const response = createBlog.mock.calls[0][0];
  expect(response.title).toBe("Kalevin testi");
  expect(response.author).toBe("Kalvi");
  expect(response.url).toBe("www.kalevinkelvi.net");
});

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../Blog";

const user = {
  username: "Kalevi",
  name: "Kalevi Karppinen",
  id: "635682d707aa524c466a43a8",
};
const blog = {
  title: "kalevin kotisivut",
  url: "www.kalevi.fi",
  author: "Kalevi",
  likes: 17,
  user: user,
  id: "63624a1f3014976c7c026840",
};

test("render title and author when nothing is clicked", () => {
  render(<Blog user={user} blog={blog} />);

  const element = screen.getByText("kalevin kotisivut");
  expect(element).toBeDefined();
});

test("render full content when blog name is clicked", async () => {
  const component = render(<Blog user={user} blog={blog} />);

  const event = userEvent.setup();
  const button = screen.getByText("kalevin kotisivut");
  await event.click(button);

  expect(component.container).toHaveTextContent("kalevin kotisivut");
  expect(component.container).toHaveTextContent("Kalevi");
  expect(component.container).toHaveTextContent("www.kalevi.fi");
});

test("like button pressed calls the like handler", async () => {
  const mockHandler = jest.fn();

  render(<Blog user={user} blog={blog} handleBlogLike={mockHandler} />);

  const event = userEvent.setup();
  const button = screen.getByText("kalevin kotisivut");
  await event.click(button);

  const likeButton = screen.getByText("like");
  await event.click(likeButton);
  await event.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

const user = {
  username: 'Kalevi',
  name: 'Kalevi Karppinen',
  id: '635682d707aa524c466a43a8'
}
const blog = {
  title: 'kalevin kotisivut',
  url: 'www.kalevi.fi',
  author: 'Kalevi',
  likes: 17,
  user: user,
  id: '63624a1f3014976c7c026840'
}

test('renders content', () => {

  render(<Blog user={user} blog={blog}/>)

  const element = screen.getByText('kalevin kotisivut')
  expect(element).toBeDefined()
})
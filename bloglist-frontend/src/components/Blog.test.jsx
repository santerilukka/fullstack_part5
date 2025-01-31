import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 0,
    user: {
      name: 'Test User',
      username: 'testuser'
    }
  }

  const loggedInUser = {
    username: 'testuser'
  }

  const { container } = render(<Blog blog={blog} loggedInUser={loggedInUser} />)


  const titleElement = container.querySelector('div')
  expect(titleElement).toHaveTextContent('Test Blog')
})
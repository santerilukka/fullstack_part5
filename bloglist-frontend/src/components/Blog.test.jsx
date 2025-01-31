import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('url, number of likes and user are displayed when the button is pressed', async () => {
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

  render(<Blog blog={blog} loggedInUser={loggedInUser} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.getByText('http://testurl.com')).toBeInTheDocument()
  expect(screen.getByText('likes 0')).toBeInTheDocument()
  expect(screen.getByText('Test User')).toBeInTheDocument()
})

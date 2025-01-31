import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, loggedInUser }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <div>{blog.url}</div>
        <div>{blog.user ? blog.user.name : 'User not available'}</div>
        <div>
          likes {blog.likes}
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        {loggedInUser.username === blog.user?.username && (
          <div>
            <button onClick={() => handleRemove(blog)}>remove</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
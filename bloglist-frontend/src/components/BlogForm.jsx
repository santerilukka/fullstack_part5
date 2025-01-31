import { useState } from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog, notification }) => {
  const [newBlog, setNewBlog] = useState({ title: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      url: newBlog.url
    })
    setNewBlog({ title: '', url: '' })
  }

  return (
    <div className='formDiv'>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
                title
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
            placeholder='Write the title of the blog'
            id='blog-title'
          />
        </div>
        <div>
                url
          <input
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
            placeholder='Write the url of the blog'
            id='blog-url'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
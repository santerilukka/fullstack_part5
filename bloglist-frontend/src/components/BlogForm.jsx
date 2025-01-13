import { useState } from 'react'
import Notification from './Notification'

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
        <div>
          <h2>Create new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                title
                <input
                    type="text"
                    value={newBlog.title}
                    name="Title"
                    onChange={({ target }) => setNewBlog({...newBlog, title: target.value})}
                />
                </div>
                <div>
                url
                <input
                    type="text"
                    value={newBlog.url}
                    name="Url"
                    onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}
                />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
      )
}

export default BlogForm
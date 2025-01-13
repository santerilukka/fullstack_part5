import Notification from './Notification'

const BlogForm = ({
    addBlog,
    newBlog,
    handleBlogChange,
    notification
}) => (
    <div>
    <form onSubmit={addBlog}>
      <h2>Create new blog</h2>
      <Notification message={notification.message} tyoe={notification.type}/>
      <div>
        title:
        <input
          type="text"
          name="title"
          value={newBlog.title}
          onChange={handleBlogChange}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="url"
          value={newBlog.url}
          onChange={handleBlogChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
    </div>
  )

export default BlogForm
const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author} - added by {blog.user.name}
  </div>  
)

export default Blog
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
    test('calls the event handler it received as props with the right details when a new blog is created', async () => {
        const createBlog = vi.fn()
        const user = userEvent.setup()

        render(<BlogForm createBlog={createBlog} />)

        const titleInput = screen.getByPlaceholderText('Write the title of the blog')
        const urlInput = screen.getByPlaceholderText('Write the url of the blog')
        const createButton = screen.getByText('create')

        await user.type(titleInput, 'Test Blog Title')
        await user.type(urlInput, 'http://testblogurl.com')
        await user.click(createButton)

        expect(createBlog).toHaveBeenCalledWith({
            title: 'Test Blog Title',
            url: 'http://testblogurl.com'
        })
        expect(createBlog).toHaveBeenCalledTimes(1)
    })
})
const loginWith = async (page, username, password) => {
    await page.fill('input[data-testid="username"]', username)
    await page.fill('input[data-testid="password"]', password)
    await page.click('button[data-testid="login-button"]')
}

const createBlog = async (page, title, url) => {
    await page.click('button[data-testid="new-blogButton"]')
    await page.fill('input[name="Title"]', title)
    await page.fill('input[name="Url"]', url)
    await page.getByTestId('blog-create-button').click()

}

export { loginWith, createBlog }
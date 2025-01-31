const loginWith = async (page, username, password) => {
    await page.fill('input[data-testid="username"]', username)
    await page.fill('input[data-testid="password"]', password)
    await page.click('button[type="submit"]')
}

export { loginWith }
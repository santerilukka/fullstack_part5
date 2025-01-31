const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.waitForSelector('form')
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {

            await page.fill('input[data-testid="username"]', 'mluukkai')
            await page.fill('input[data-testid="password"]', 'salainen')
            await page.click('button[type="submit"]')

            await page.waitForSelector('[data-testid="logged-in-user"]')
            await expect(page.getByTestId('logged-in-user')).toBeVisible()
        })
    
        test('fails with wrong credentials', async ({ page }) => {
            await page.fill('input[data-testid="username"]', 'mluukkai')
            await page.fill('input[data-testid="password"]', 'wrong')
            await page.click('button[type="submit"]')

            await expect(page.getByText('Wrong credentials')).toBeVisible()
        })
      })
})
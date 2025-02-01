const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
   const response = await request.post('http://localhost:3003/api/testing/reset')


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

    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {

            await loginWith(page, 'mluukkai', 'salainen')

            await page.waitForSelector('[data-testid="logged-in-user"]')
            await expect(page.getByTestId('logged-in-user')).toBeVisible()
        })
    
        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'mluukkai', 'wrong')

            await expect(page.getByText('Wrong credentials')).toBeVisible()
        })
      })

      describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'mluukkai', 'salainen')
        })
    
        test('A new blog can be created', async ({ page }) => {
            await page.getByTestId('new-blogButton').click()
    
            await page.getByRole('textbox', { name: 'title' }).fill('Test title created by Playwright')
            await page.getByRole('textbox', { name: 'url' }).fill('http://playwright.dev')
            await page.getByTestId('blog-create-button').click()
    
            await expect(page.getByText('Test title created by Playwright view')).toBeVisible()
        })
    })
})
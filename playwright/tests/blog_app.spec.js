const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')
const { create } = require('domain')

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
            await createBlog(page, 'Test title created by Playwright', 'http://playwright.dev')
    
            await expect(page.getByText('Test title created by Playwright view')).toBeVisible()
        })
        test('A blog can be liked', async ({ page }) => {
            await createBlog(page, 'Test title created by Playwright', 'http://playwright.dev')
            
            await page.getByText('view').click()
            await page.getByText('like').click()
            
            await expect(page.getByText('likes 1')).toBeVisible()
        })
    })
})
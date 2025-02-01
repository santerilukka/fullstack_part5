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
        test('A blog can be removed', async ({ page }) => {
            await createBlog(page, 'Test title created by Playwright', 'http://playwright.dev')
            await page.getByText('view').click()

            page.on('dialog', async dialog => {
                await dialog.accept()
            })
            
            await page.getByText('remove').click()
    
            await expect(page.getByText('Test title created by Playwright')).not.toBeVisible()
        })
    })
    describe('When logged in and creating multiple blogs', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'mluukkai', 'salainen');
        });

        test('Blogs are ordered by likes', async ({ page }) => {
            await createBlog(page, 'blog-1', 'Testitero', 'http://blog-1.dev')
            await createBlog(page, 'blog-2', 'Testaajatero', 'http://blog-2.dev')
            await createBlog(page, 'blog-3', 'TestiTomppa', 'http://blog-3.dev')

            const blog1 = page.locator('.blog').filter({ hasText: 'blog-1' })
            const blog2 = page.locator('.blog').filter({ hasText: 'blog-2' })
            const blog3 = page.locator('.blog').filter({ hasText: 'blog-3' })
    
            await blog1.getByRole('button', { name: 'view' }).click()
            await blog2.getByRole('button', { name: 'view' }).click()
            await blog3.getByRole('button', { name: 'view' }).click()
    
            await blog3.getByRole('button', { name: 'like' }).click()
            await blog3.getByRole('button', { name: 'like' }).click()
            await blog2.getByRole('button', { name: 'like' }).click()

            await page.waitForTimeout(1000)
    
            expect(blog3).toContainText('likes 2')
            expect(blog2).toContainText('likes 1')
            expect(blog1).toContainText('likes 0')
    
            expect(page.locator('.blog').first()).toContainText('blog-3')
            expect(page.locator('.blog').nth(1)).toContainText('blog-2')
            expect(page.locator('.blog').last()).toContainText('blog-1')
        });
        })

    describe('When logged in as a different user', () => {
        beforeEach(async ({ page }) => {
            await request.post('http://localhost:3003/api/users', {
                data: {
                  name: 'Mette Laakkainen',
                  username: 'melaak',
                  password: 'salasana'
                }
        });
    
        test('A non-creator cannot see the remove button', async ({ page }) => {
          await loginWith(page, 'mluukkai', 'salainen');
          await createBlog(page, 'Test title created by Playwright', 'http://playwright.dev');
          await page.getByText('logout').click();
    
          await loginWith(page, 'melaak', 'salasana');
          await page.getByText('view').click();
          await expect(page.locator('text=remove')).not.toBeVisible();
        })
    })
})
})
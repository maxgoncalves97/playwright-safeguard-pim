import { test, expect } from '@playwright/test';

test('OrangeHRM login page loads successfully via API request', async ({ request }) => {
  const response = await request.get(
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
  );

  expect(response.status()).toBe(200);

  const responseText = await response.text();

  expect(responseText).toContain('OrangeHRM');
  expect(responseText).toContain('auth-login');
});


test('OrangeHRM login validation rejects request without CSRF token', async ({ request }) => {
  const response = await request.post(
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate',
    {
      form: {
        username: 'Admin',
        password: 'admin123',
      },
    }
  );

  expect(response.status()).toBe(200);

  const responseText = await response.text();

  expect(responseText).toContain('invalid_csrf_token');
});
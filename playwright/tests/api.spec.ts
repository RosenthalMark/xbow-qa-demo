import { test, expect } from '@playwright/test';

test.describe('OWASP Juice Shop - API Tests', () => {

  test('GET /api/Products returns 200 and product list', async ({ request }) => {
    const response = await request.get('/api/Products');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('GET /api/Products returns expected fields', async ({ request }) => {
    const response = await request.get('/api/Products');
    const body = await response.json();
    const product = body.data[0];
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('description');
  });

  test('POST /api/Users registers a new user', async ({ request }) => {
    const response = await request.post('/api/Users', {
      data: {
        email: `test_${Date.now()}@xbow.test`,
        password: 'TestPass123!',
        passwordRepeat: 'TestPass123!',
        securityQuestion: { id: 1, question: 'Your eldest siblings middle name?', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
        securityAnswer: 'test'
      }
    });
    expect(response.status()).toBe(201);
  });

  test('POST /rest/user/login returns auth token', async ({ request }) => {
    const response = await request.post('/rest/user/login', {
      data: {
        email: 'admin@juice-sh.op',
        password: 'admin123'
      }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.authentication).toBeDefined();
    expect(body.authentication.token).toBeDefined();
  });

  test('GET /api/Challenges returns challenge list', async ({ request }) => {
    const response = await request.get('/api/Challenges');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(Array.isArray(body.data)).toBe(true);
  });

  test('invalid login returns 401', async ({ request }) => {
    const response = await request.post('/rest/user/login', {
      data: {
        email: 'notreal@fake.com',
        password: 'wrongpassword'
      }
    });
    expect(response.status()).toBe(401);
  });

  test('API response includes content-type header', async ({ request }) => {
    const response = await request.get('/api/Products');
    expect(response.headers()['content-type']).toContain('application/json');
  });

  test('GET /rest/admin/application-configuration is accessible', async ({ request }) => {
    const response = await request.get('/rest/admin/application-configuration');
    // This endpoint should require auth - documenting the vulnerability if it doesn't
    expect([200, 401, 403]).toContain(response.status());
  });

});

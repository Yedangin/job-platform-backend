import axios from 'axios';

describe('Authentication E2E Testing', () => {
  it('should login successfully and set session cookie', async () => {
    const response = await axios.post('/auth/login', {
      email: 'test@test.com',
      password: 'password',
    });

    // 1️⃣ Status check
    expect(response.status).toBe(201);

    // 2️⃣ Body check
    expect(response.data).toEqual({
      message: 'Login successful',
    });

    // 3️⃣ Cookie check
    const setCookie = response.headers['set-cookie'];
    expect(setCookie).toBeDefined();

    // 4️⃣ Ensure sessionId exists
    const hasSessionCookie = setCookie.some((cookie: string) =>
      cookie.startsWith('sessionId=')
    );

    expect(hasSessionCookie).toBe(true);
  });

  it('should access profile with session cookie', async () => {
    const loginRes = await axios.post('/auth/login', {
      email: 'test@test.com',
      password: 'password',
    });

    const cookies = loginRes.headers['set-cookie'];

    const profileRes = await axios.get('/auth/profile', {
      headers: {
        Cookie: cookies.join(';'),
      },
    });

    expect(profileRes.status).toBe(200);
    expect(profileRes.data).toHaveProperty('success', true);
    expect(profileRes.data).toHaveProperty(
      'message',
      'Profile retrieved successfully'
    );

    // nested user checks
    expect(profileRes.data).toHaveProperty('user');
    expect(profileRes.data.user).toHaveProperty('email', 'test@test.com');
    expect(profileRes.data.user).toHaveProperty('id');
    expect(profileRes.data.user).toHaveProperty('role');
  });
});

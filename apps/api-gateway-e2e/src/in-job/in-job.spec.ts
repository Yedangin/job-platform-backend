import axios from 'axios';

describe('GET /auth', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/auth`);
    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Auth Service is running'});
  });
});

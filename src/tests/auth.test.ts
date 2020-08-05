import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('AUTH', () => {
  const user = {
    first_name: 'Timmy',
    last_name: 'Timmison',
    email: 'timmy@timmy.com',
    password: 'timmy123',
  };
  describe('/auth/register', () => {
    it('GET status 404 error', () => {
      return request.post('/auth/register').send(user).expect(404);
    });
  });
});

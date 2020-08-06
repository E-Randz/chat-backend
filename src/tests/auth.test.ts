import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('AUTH', () => {
  const malformedUser = {
    firstName: 'Timmy',
    lastName: 'Timmison',
    email: 'timmy@timmy.com',
  };
  describe('/auth/register', () => {
    it('POST status 400 if malformed user', () => {
      return request.post('/auth/register').send(malformedUser).expect(400);
    });
  });
});

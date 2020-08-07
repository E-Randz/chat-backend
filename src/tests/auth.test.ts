import supertest from 'supertest';
import { expect } from 'chai';

import app from '../app';
import db from '../db';

const request = supertest(app);

describe('AUTH', () => {
  beforeEach(() => db.seed.run());
  after(() => db.destroy());

  describe('/auth/register', () => {
    it('POST status 201 upon user registration and returns user', () => {
      const user = {
        firstName: 'Timmy',
        lastName: 'Timmison',
        email: 'timmy@timmy.com',
        password: 'heiudgwlgcFUF565657@@',
      };

      return request.post('/auth/register').send(user).expect(201);
    });

    it('POST status 400 if user does not enter all required fields', () => {
      const user = {
        firstName: 'Timmy',
        lastName: 'Timmison',
        email: 'timmy@timmy.com',
      };

      return request
        .post('/auth/register')
        .send(user)
        .expect(400)
        .then((res) => {
          const text = JSON.parse(res.error.text);
          expect(text.errors[0].param).equals('password');
          expect(text.errors[0].msg).equals(
            'Password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
          );
        });
    });

    it('POST status 400 if user enters an invalid password', () => {
      const user = {
        firstName: 'Timmy',
        lastName: 'Timmison',
        email: 'timmy@timmy.com',
        password: 'password123',
      };

      return request
        .post('/auth/register')
        .send(user)
        .expect(400)
        .then((res) => {
          const text = JSON.parse(res.error.text);
          expect(text.errors[0].param).equals('password');
          expect(text.errors[0].msg).equals(
            'Password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
          );
        });
    });
  });
});

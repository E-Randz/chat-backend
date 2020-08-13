import supertest from 'supertest';
import { expect } from 'chai';

import app from '../app';
import db from '../db';

const request = supertest(app);

describe('AUTH', () => {
  beforeEach(() => db.seed.run());
  after(() => {
    return db.destroy();
  });

  describe('/auth/register', () => {
    it('POST status 201 upon user registration', () => {
      const user = {
        first_name: 'Timmy',
        last_name: 'Timmison',
        email: 'timmy@timmy.com',
        password: 'heiudgwlgcFUF565657@@',
      };

      return request.post('/auth/register').send(user).expect(201);
    });

    it('Returns created user upon successful registration', () => {
      const user = {
        first_name: 'Timmy',
        last_name: 'Timmison',
        email: 'timmy@timmy.com',
        password: 'heiudgwlgcFUF565657@@',
      };

      return request
        .post('/auth/register')
        .send(user)
        .expect(201)
        .then(({ body }) => {
          expect(body.user).to.have.keys([
            'email',
            'id',
            'first_name',
            'last_name',
          ]);
        });
    });

    it('POST status 409 (conflict) if the email address is already in use', () => {
      const user = {
        first_name: 'Timmy',
        last_name: 'Timmison',
        email: 'lsteers0@noaa.gov',
        password: 'heiudgwlgcFUF565657@@',
      };

      return request.post('/auth/register').send(user).expect(409);
    });

    it('returns a status code of 400 if user already logged in', () => {
      const user = {
        email: 'lsteers0@noaa.gov',
        password: 'PwUQ6x',
      };

      const registerUser = {
        email: 'test0@noaa.gov',
        password: 'PwUQ6x25172165',
      };

      return request
        .post('/auth/login')
        .send(user)
        .then((res) => {
          const cookie = res.header['set-cookie'];
          return request
            .post('/auth/register')
            .send(registerUser)
            .set('cookie', cookie)
            .expect(400);
        });
    });

    it('returns a status code of 400 if user already logged in', () => {
      const user = {
        email: 'lsteers0@noaa.gov',
        password: 'PwUQ6x',
      };

      return request
        .post('/auth/login')
        .send(user)
        .then((res) => {
          const cookie = res.header['set-cookie'];
          return request
            .post('/auth/login')
            .send(user)
            .set('cookie', cookie)
            .expect(400);
        });
    });

    it('POST status 400 if user does not enter all required fields', () => {
      const user = {
        first_name: 'Timmy',
        last_name: 'Timmison',
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
            'Password must contain a minimum of 8 characters, a maximum of 30 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
          );
        });
    });

    it('POST status 400 if user enters an invalid password', () => {
      const user = {
        first_name: 'Timmy',
        last_name: 'Timmison',
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
            'Password must contain a minimum of 8 characters, a maximum of 30 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
          );
        });
    });
  });

  describe('/auth/login', () => {
    it('returns a status code of 200 upon successful login', () => {
      const user = {
        email: 'lsteers0@noaa.gov',
        password: 'PwUQ6x',
      };

      return request.post('/auth/login').send(user).expect(200);
    });

    it('returns a status code of 400 if user already logged in', () => {
      const user = {
        email: 'lsteers0@noaa.gov',
        password: 'PwUQ6x',
      };

      return request
        .post('/auth/login')
        .send(user)
        .then((res) => {
          const cookie = res.header['set-cookie'];
          return request
            .post('/auth/login')
            .send(user)
            .set('cookie', cookie)
            .expect(400);
        });
    });

    it('returns a status code of 400 if the password field is empty', () => {
      const user = {
        email: 'timmy@timmy.com',
      };

      return request
        .post('/auth/login')
        .send(user)
        .expect(400)
        .then((res) => {
          const text = JSON.parse(res.error.text);
          expect(text.errors[0].param).equals('password');
          expect(text.errors[0].msg).equals('Password cannot be empty');
        });
    });

    it('returns a status code of 400 if the email field is empty', () => {
      const user = {
        password: 'aggdkyuaGSkxa576',
      };

      return request
        .post('/auth/login')
        .send(user)
        .expect(400)
        .then((res) => {
          const text = JSON.parse(res.error.text);
          expect(text.errors[0].param).equals('email');
          expect(text.errors[0].msg).equals('Email cannot be empty');
        });
    });

    it('returns a status code of 400 if the email is not a valid email address', () => {
      const user = {
        email: 'hey',
        password: 'aggdkyuaGSkxa576',
      };

      return request
        .post('/auth/login')
        .send(user)
        .expect(400)
        .then((res) => {
          const text = JSON.parse(res.error.text);
          expect(text.errors[0].param).equals('email');
          expect(text.errors[0].msg).equals('Invalid email address');
        });
    });
  });
});

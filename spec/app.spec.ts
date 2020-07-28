import { expect } from 'chai';
import supertest from 'supertest';
import app from '../src/app';

process.env.NODE_ENV = 'test';

const request = supertest(app);

describe('/', () => {
  it('GET status 200 responds with JSON describing all available endpoints in API', () => {
    return request
      .get('/')
      .expect(200)
      .then(({ body }) => {
        expect(body.endpoints).to.be.an('object');
        expect(body.endpoints['/']).to.equal(
          'serving a list of endpoints and available methods',
        );
      });
  });
});

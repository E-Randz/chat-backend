import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('API', () => {
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
});

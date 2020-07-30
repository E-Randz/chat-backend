import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

// describe('AUTH', () => {
//   describe('/auth', () => {
//     it('GET status 404 error', () => {
//       return request.get('/auth').expect(404);
//     });
//   });
// });

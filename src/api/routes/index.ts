import { Router } from 'express';
import endpoints from './endpoints';
import auth from './auth';

export default (): Router => {
  const app = Router();

  endpoints(app);
  auth(app);

  return app;
};

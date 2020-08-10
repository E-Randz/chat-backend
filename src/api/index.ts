import { Router } from 'express';
import endpoints from './routes/endpoints';
import auth from './routes/auth';

export default (): Router => {
  const app = Router();

  endpoints(app);
  auth(app);

  return app;
};

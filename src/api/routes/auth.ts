import { Router } from 'express';

const route = Router();

export default (app: Router): void => {
  app.use('/auth', route);
};

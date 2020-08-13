import { Router, Request, Response } from 'express';
import { Container } from 'typedi';

import AuthService from '../../services/auth';
import registerValidator from '../middleware/validation/registerValidator';
import loginValidator from '../middleware/validation/loginValidator';
import { guest, auth } from '../middleware/auth';
import { logIn, logOut } from '../utils/auth';
import { catchAsync } from '../middleware/errors';

const route = Router();

export default (app: Router): void => {
  app.use('/auth', route);

  route.post(
    '/register',
    guest,
    registerValidator,
    catchAsync(async (req: Request, res: Response) => {
      const userData = req.body;
      const authServiceInstance = Container.get(AuthService);
      const user = await authServiceInstance.Register(userData);

      return res.status(201).json({ user });
    }),
  );

  route.post(
    '/login',
    guest,
    loginValidator,
    catchAsync(async (req: Request, res: Response) => {
      const userData = req.body;
      const authServiceInstance = Container.get(AuthService);
      const user = await authServiceInstance.Login(userData);

      logIn(req, user!.id);

      return res.status(200).json({ message: 'OK' });
    }),
  );

  route.post(
    '/logout',
    auth,
    catchAsync(async (req: Request, res: Response) => {
      await logOut(req, res);
      res.status(204).json({ message: 'OK' });
    }),
  );
};

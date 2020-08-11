import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '../../services/auth';
import registerValidator from '../middleware/validation/registerValidator';
import loginValidator from '../middleware/validation/loginValidator';
import { checkIfGuest } from '../middleware/auth';
import { logIn } from '../utils/auth';
import { nextTick } from 'process';
import { catchAsync } from '../middleware/errors';

const route = Router();

export default (app: Router): void => {
  app.use('/auth', route);

  route.post(
    '/register',
    checkIfGuest,
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
    checkIfGuest,
    loginValidator,
    catchAsync(async (req: Request, res: Response) => {
      const userData = req.body;
      const authServiceInstance = Container.get(AuthService);
      const user = await authServiceInstance.Login(userData);

      logIn(req, user!.id);

      return res.status(200).json({ message: 'OK' });
    }),
  );
};

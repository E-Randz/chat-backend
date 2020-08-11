import { Router, Request, Response } from 'express';
import { Container } from 'typedi';
import AuthService from '../../services/auth';
import registerValidator from '../middleware/validation/registerValidator';
import loginValidator from '../middleware/validation/loginValidator';
import { checkIfGuest } from '../middleware/auth';
import { logIn } from '../utils/auth';
import { nextTick } from 'process';

const route = Router();

export default (app: Router): void => {
  app.use('/auth', route);

  route.post(
    '/register',
    checkIfGuest,
    registerValidator,
    async (req: Request, res: Response) => {
      const userData = req.body;

      const authServiceInstance = Container.get(AuthService);

      const { user, err } = await authServiceInstance.Register(userData);

      if (err) {
        return err.code === '23505'
          ? res.status(409).json({ errors: err.errors })
          : res.status(500);
      }

      return res.status(201).json({ user });
    },
  );

  route.post(
    '/login',
    checkIfGuest,
    loginValidator,
    async (req: Request, res: Response) => {
      const userData = req.body;

      const authServiceInstance = Container.get(AuthService);

      const { user, err } = await authServiceInstance.Login(userData);

      if (err) {
        return res.status(401).json({ errors: err.errors() });
      }

      logIn(req, user!.id);

      return res.status(200).json({ message: 'OK' });
    },
  );
};

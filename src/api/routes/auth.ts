import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '../../services/auth';
import userValidator from '../middleware/validation/userValidator';

const route = Router();

export default (app: Router): void => {
  app.use('/auth', route);

  route.post(
    '/register',
    userValidator,
    async (req: Request, res: Response) => {
      const userData = req.body;

      const authServiceInstance = Container.get(AuthService);

      const { user } = await authServiceInstance.Register(userData);

      return res.json({ user });
    },
  );
};

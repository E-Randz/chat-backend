import { Router, Request, Response } from 'express';
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

      const { user, err } = await authServiceInstance.Register(userData);

      if (err) {
        if (err.code === '23505') {
          return res.status(409).json({
            errors: [
              {
                msg: err.detail,
                param: 'email',
                location: 'body',
              },
            ],
          });

          [
            {
              msg:
                'Password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
              param: 'password',
              location: 'body',
            },
          ];
        }
      }

      return res.status(201).json({ user });
    },
  );
};

import { Router, Request, Response } from 'express';
import { Container } from 'typedi';
import AuthService from '../../services/auth';
import registerValidator from '../middleware/validation/registerValidator';
import loginValidator from '../middleware/validation/loginValidator';

const route = Router();

export default (app: Router): void => {
  app.use('/auth', route);

  route.post(
    '/register',
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

  route.post('/login', loginValidator, async (req: Request, res: Response) => {
    const userData = req.body;

    const authServiceInstance = Container.get(AuthService);

    const { user, err } = await authServiceInstance.Login(userData);

    if (err) {
    }

    req.session!.userID = user!.id;

    return res.status(200).json({ message: 'OK' });
    // const authServiceInstance = Container.get(AuthService);

    // const { user, err } = await authServiceInstance.Register(userData);

    // if (err) {
    //   return err.code === '23505'
    //     ? res.status(409).json({ errors: err.errors })
    //     : res.status(500);
    // }

    // return res.status(201).json({ user });
  });
};

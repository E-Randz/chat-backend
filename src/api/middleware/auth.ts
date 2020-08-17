import { Request, Response, NextFunction } from 'express';

import { isLoggedIn, logOut } from '../utils/auth';
import { BadRequest, Unauthorized } from '../../errors';
import config from '../../config';

export const guest = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (isLoggedIn(req)) {
    return next(new BadRequest('User is already logged in'));
  }
  next();
};

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  if (!isLoggedIn(req)) {
    return next(new Unauthorized());
  }
  next();
};

export const active = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (isLoggedIn(req)) {
    const now = Date.now();
    const { createdAt } = req.session as Express.Session;

    if (now > createdAt + config.SESSION_ABSOLUTE_TIMEOUT) {
      await logOut(req, res);

      return next(new Unauthorized('Session Expired'));
    }
  }
  next();
};

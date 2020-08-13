import { Request, Response, NextFunction } from 'express';

import { isLoggedIn } from '../utils/auth';
import { BadRequest, Unauthorized } from '../../errors';

export const checkIfGuest = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (isLoggedIn(req)) {
    return next(new BadRequest('User is already logged in'));
  }
  next();
};

export const checkIfLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!isLoggedIn(req)) {
    return next(new Unauthorized());
  }
  next();
};

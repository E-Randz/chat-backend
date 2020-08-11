import { Request, Response, NextFunction } from 'express';
import { isLoggedIn } from '../utils/auth';

export const checkIfGuest = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (isLoggedIn(req)) {
    return next(new Error('User is already logged in'));
  }
  next();
};

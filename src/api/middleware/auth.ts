import { Request, Response, NextFunction } from 'express';
import { isLoggedIn } from '../utils/auth';

export const checkIfGuest = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.log('check if logged in');
  if (isLoggedIn(req)) {
    console.log('user already logged in');
    return next(new Error('User is already logged in'));
  }
  next();
};

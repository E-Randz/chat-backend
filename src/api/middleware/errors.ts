import { RequestHandler, Request, Response, NextFunction } from 'express';
import { ErrorWithStatus } from '../../typescript/IErrors';

export const catchAsync = (handler: RequestHandler): RequestHandler => (
  req: Request,
  res: Response,
  next: NextFunction,
): RequestHandler => handler(req, res, next).catch(next);

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // if no other route matches
  const error: ErrorWithStatus = new Error('Not found');
  error.status = 404;
  next(error);
};

export const internalServerError = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
): void => {
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal Server Error' });
};

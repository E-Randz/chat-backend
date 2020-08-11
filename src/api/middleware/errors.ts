import { RequestHandler, Request, Response, NextFunction } from 'express';

export const catchAsync = (handler: RequestHandler): RequestHandler => (
  req: Request,
  res: Response,
  next: NextFunction,
): RequestHandler => handler(req, res, next).catch(next);

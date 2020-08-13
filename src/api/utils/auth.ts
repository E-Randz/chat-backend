import { Request, Response } from 'express';
import config from '../../config';

export const isLoggedIn = (req: Request): boolean => !!req.session!.userID;

export const logIn = (req: Request, userID: number): void => {
  req.session!.userID = userID;
};

export const logOut = (req: Request, res: Response): Promise<void> => {
  return new Promise((resolve, reject) => {
    req.session!.destroy((err: Error) => {
      if (err) reject(err);

      res.clearCookie(config.SESSION_NAME);

      resolve();
    });
  });
};

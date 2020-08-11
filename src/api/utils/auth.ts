import { Request } from 'express';

export const isLoggedIn = (req: Request): boolean => !!req.session!.userID;

export const logIn = (req: Request, userID: number): void => {
  req.session!.userID = userID;
};

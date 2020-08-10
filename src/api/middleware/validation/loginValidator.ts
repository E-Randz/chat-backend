import { Response, Request, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export default [
  check('email')
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Invalid email address'),
  check('password').not().isEmpty().withMessage('Password cannot be empty'),
  (req: Request, res: Response, next: NextFunction): Response | void => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

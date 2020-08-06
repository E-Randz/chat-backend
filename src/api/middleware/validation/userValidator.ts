import { Response, Request, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export default [
  check('firstName')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('First Name can not be empty'),
  check('lastName')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Last Name can not be empty'),
  check('email')
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage('Email can not be empty')
    .isEmail()
    .withMessage('Invalid email address!'),
  check('password')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .withMessage(
      'Password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    ),
  (req: Request, res: Response, next: NextFunction): Response | void => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

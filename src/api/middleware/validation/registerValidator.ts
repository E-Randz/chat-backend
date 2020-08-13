import { Response, Request, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export default [
  check('first_name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('First Name can not be empty'),
  check('last_name')
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
    .bail()
    .isEmail()
    .withMessage('Invalid email address'),
  check('password')
    .matches(
      /^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,30}$/u,
    )
    .withMessage(
      'Password must contain a minimum of 8 characters, a maximum of 30 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    ),
  (req: Request, res: Response, next: NextFunction): Response | void => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

import { ErrorRequestHandler } from 'express';

const handle400: ErrorRequestHandler = (err, req, res, next) => {
  const errCodes = ['42703', '22P02', '23502'];
  if (errCodes.includes(err.code) || err.status === 400) {
    res.status(400).send({ message: err.detail || err.toString() });
  } else next(err);
};

const handle422: ErrorRequestHandler = (err, req, res, next) => {
  const errCodes = ['23505'];
  if (errCodes.includes(err.code))
    res.status(422).send({ message: err.detail || err.toString() });
  else next(err);
};

const handle404: ErrorRequestHandler = (err, req, res, next) => {
  const errCodes = ['23503'];
  if (err.status === 404 || errCodes.includes(err.code)) {
    res.status(404).send({ message: err.message });
  } else next(err);
};

const handle405: ErrorRequestHandler = (err, req, res) => {
  res.status(405).send({ message: 'Invalid Method on URL' });
};

const handle500: ErrorRequestHandler = (err, req, res) => {
  res.status(500).send({ message: 'Server Error' });
};

export default { handle400, handle422, handle404, handle405, handle500 };

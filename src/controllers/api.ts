import { RequestHandler } from 'express';

const endpoints = {
  '/': 'serving a list of endpoints and available methods',
};

const sendEndpoints: RequestHandler = (req, res, next) =>
  res.status(200).send({ endpoints });

export default sendEndpoints;

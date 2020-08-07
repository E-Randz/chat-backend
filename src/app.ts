import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';

import { ErrorWithStatus } from './interfaces/IErrors';
import routes from './api';
import config from './config';
import { SESSION_OPTIONS } from './loaders';

// INITIALISE EXPRESS
const app = express();

// SETUP SESSIONS WITH REDIS AS CACHE
app.use(session(SESSION_OPTIONS));

// only enable morgan logging in development
if (config.ENV === 'dev') {
  app.use(morgan('dev'));
}

// accessed in the config files
const apiPrefix = config.API_PREFIX;

app.use(cors());
app.use(express.json());
app.use(apiPrefix, routes());

// error handling
app.use((req, res, next) => {
  // if no other route matches
  const error: ErrorWithStatus = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((err: ErrorWithStatus, req: Request, res: Response) => {
  res.status(err.status || 500);

  res.json({
    error: {
      message: err.message,
    },
  });
});

export default app;

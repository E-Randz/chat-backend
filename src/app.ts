import express, { Errback, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import sendEndpoints from './controllers/api';
import authRouter from './routes/auth';

const app = express();

// only enable morgan logging in development
if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.get('/', sendEndpoints);
app.use('/auth', authRouter);

interface ErrorWithStatus extends Error {
  status?: number;
}

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

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';

import routes from './api/routes';
import config from './config';
import { SESSION_OPTIONS } from './loaders';
import {
  internalServerError,
  notFoundError,
  catchAsync,
} from './api/middleware/errors';
import { active } from './api/middleware/auth';

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

// clear session if past absolute timeout
app.use(catchAsync(active));

// routes
app.use(apiPrefix, routes());

// error handling
app.use(notFoundError);
app.use(internalServerError);

export default app;

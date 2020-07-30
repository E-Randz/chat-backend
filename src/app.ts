import express from 'express';
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

export default app;

import express from 'express';
import cors from 'cors';

import sendEndpoints from './controllers/api';
import authRouter from './routes/auth';

const app = express();

app.use(cors());
app.use(express.json());
app.get('/', sendEndpoints);
app.use('/auth', authRouter);

export default app;

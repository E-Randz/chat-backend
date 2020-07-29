import app from './app';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../config/${process.env.ENVIRONMENT}.env'),
});

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

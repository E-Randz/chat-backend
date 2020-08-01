import app from './app';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, `../config/${process.env.NODE_ENV}.env`),
});

const { PORT } = process.env;

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Listening on port ${PORT}`);
});

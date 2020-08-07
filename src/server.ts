import app from './app';
import config from './config';

app.listen(config.PORT, () => {
  // eslint-disable-next-line
  console.log(`Listening on port ${config.PORT}`);
});

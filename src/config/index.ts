import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, `../../config/${process.env.NODE_ENV}.env`),
});

const config = {
  // # APP
  HOST: process.env.HOST!,
  PORT: parseInt(process.env.PORT!, 10),
  API_PREFIX: process.env.API_PREFIX! || '/',
  ENV: process.env.NODE_ENV!,

  // # DB
  DB_URL: process.env.DB_URL!,

  // # SESSIONS
  SESSION_SECRET: process.env.SESSION_SECRET!,
  SESSION_NAME: process.env.SESSION_NAME!,
  SESSION_IDLE_TIMEOUT: parseInt(process.env.SESSION_IDLE_TIMEOUT!, 10),

  // # REDIS OPTIONS
  REDIS_HOST: process.env.REDIS_HOST!,
  REDIS_PORT: parseInt(process.env.REDIS_PORT!, 10),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD!,
};

export default config;

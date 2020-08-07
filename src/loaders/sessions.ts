import Redis, { RedisOptions } from 'ioredis';
import connectRedis from 'connect-redis';
import session, { SessionOptions } from 'express-session';
import config from '../config';

// REDIS SETUP

const REDIS_OPTIONS: RedisOptions = {
  port: parseInt(config.REDIS_PORT, 10),
  host: config.REDIS_HOST,
  password: config.REDIS_PASSWORD,
};

const RedisStore = connectRedis(session);
const client = new Redis(REDIS_OPTIONS);

// SESSION SETUP

const SESSION_OPTIONS: SessionOptions = {
  secret: config.SESSION_SECRET,
  name: config.SESSION_NAME,
  store: new RedisStore({ client }),
  cookie: {
    maxAge: parseInt(config.SESSION_IDLE_TIMEOUT, 10),
    secure: config.ENV === 'prod',
    sameSite: true,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
};

export default SESSION_OPTIONS;

import Redis, { RedisOptions } from 'ioredis';
import connectRedis from 'connect-redis';
import session, { SessionOptions } from 'express-session';

// REDIS SETUP
const { REDIS_PORT, REDIS_HOST, REDIS_PASSWORD } = process.env;

const REDIS_OPTIONS: RedisOptions = {
  port: parseInt(REDIS_PORT!, 10),
  host: REDIS_HOST!,
  password: REDIS_PASSWORD!,
};

const RedisStore = connectRedis(session);
const client = new Redis(REDIS_OPTIONS);

// SESSION SETUP
const {
  NODE_ENV,
  SESSION_SECRET,
  SESSION_NAME,
  SESSION_IDLE_TIMEOUT,
} = process.env;

const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET!,
  name: SESSION_NAME!,
  store: new RedisStore({ client }),
  cookie: {
    maxAge: parseInt(SESSION_IDLE_TIMEOUT!, 10),
    secure: NODE_ENV === 'prod',
    sameSite: true,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
};

export default SESSION_OPTIONS;

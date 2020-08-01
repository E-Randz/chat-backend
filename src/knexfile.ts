import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, `../config/${process.env.NODE_ENV}.env`),
});

const dbConfig: { [index: string]: any } = {
  development: {
    client: 'pg',
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
    connection: process.env.DB_URL,
  },
  test: {
    client: 'pg',
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
    connection: process.env.DB_URL,
  },
  production: {
    client: 'pg',
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
    connection: `${process.env.DB_URL}?ssl=true`,
  },
};

module.exports = dbConfig;

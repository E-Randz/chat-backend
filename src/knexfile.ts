import config from './config';

const dbConfig: { [index: string]: any } = {
  development: {
    client: 'pg',
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
    connection: config.DB_URL,
  },
  test: {
    client: 'pg',
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
    connection: config.DB_URL,
  },
  production: {
    client: 'pg',
    migrations: {
      directory: __dirname + '/db/seeds',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
    connection: `${config.DB_URL}?ssl=true`,
  },
};

module.exports = dbConfig;

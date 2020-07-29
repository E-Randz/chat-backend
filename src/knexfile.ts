const dbConfig: { [index: string]: any } = {
  development: {
    client: 'pg',
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    connection: process.env.DB_URL,
  },
  test: {
    client: 'pg',
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    connection: process.env.DB_URL,
  },
  production: {
    client: 'pg',
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    connection: `${process.env.DB_URL}?ssl=true`,
  },
};

export default dbConfig;

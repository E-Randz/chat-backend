import knex from 'knex';
const knexfile = require('../knexfile');
import config from '../config';

const env = config.ENV || 'dev';
const configOptions = knexfile[env];

export default knex(configOptions);

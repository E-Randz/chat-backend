import knex from 'knex';
import config from '../config';
// todo knexfile doesn't seem to work well with import syntax. try and fix
const knexfile = require('../knexfile');

const env = config.ENV || 'dev';
const configOptions = knexfile[env];

export default knex(configOptions);

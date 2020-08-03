import * as Knex from 'knex';
import { users } from '../seed-data/index';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries

  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');

  // Inserts seed entries
  await knex('users').insert(users);
}

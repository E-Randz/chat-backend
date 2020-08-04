import * as Knex from 'knex';
import { threads } from '../seed-data/index';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE threads RESTART IDENTITY CASCADE');

  // Inserts seed entries
  await knex('threads').insert(threads);
}

import * as Knex from 'knex';
import { channels } from '../seed-data/index';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE channels RESTART IDENTITY CASCADE');

  // Inserts seed entries
  await knex('channels').insert(channels);
}

import * as Knex from 'knex';
import { teams } from '../seed-data/index';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE teams RESTART IDENTITY CASCADE');

  // Inserts seed entries
  await knex('teams').insert(teams);
}

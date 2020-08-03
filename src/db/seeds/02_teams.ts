import * as Knex from 'knex';
import { teams } from '../seed-data/index';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('teams').del();

  // Inserts seed entries
  await knex('teams').insert(teams);
}

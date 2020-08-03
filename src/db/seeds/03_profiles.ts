import * as Knex from 'knex';
import { profiles } from '../seed-data/index';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE profiles RESTART IDENTITY CASCADE');

  // Inserts seed entries
  await knex('profiles').insert(profiles);
}

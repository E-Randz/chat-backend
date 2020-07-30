import * as Knex from 'knex';
import { userData } from '../data/index';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user').del();

  // Inserts seed entries
  await knex('user').insert(userData);
}

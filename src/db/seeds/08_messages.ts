import * as Knex from 'knex';
import { messages } from '../seed-data/index';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE messages RESTART IDENTITY CASCADE');

  // Inserts seed entries
  await knex('messages').insert(messages);
}

import * as Knex from 'knex';
import { threadParticipants } from '../seed-data/index';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE thread_participants RESTART IDENTITY CASCADE');

  // Inserts seed entries
  await knex('thread_participants').insert(threadParticipants);
}

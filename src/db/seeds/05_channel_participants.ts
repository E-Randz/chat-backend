import * as Knex from 'knex';
import { channelParticipants } from '../seed-data/index';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw(
    'TRUNCATE TABLE channel_participants RESTART IDENTITY CASCADE',
  );

  // Inserts seed entries
  await knex('channel_participants').insert(channelParticipants);
}

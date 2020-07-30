import * as Knex from 'knex';
import { generator } from '../utils/fakerGenerator';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  const userSchema = {
    email: '{{internet.email}}',
    first_name: '{{name.firstName}}',
    last_name: '{{name.lastName}}',
  };

  const data = generator(userSchema, 1000);

  // Inserts seed entries
  await knex('users').insert(data);
}

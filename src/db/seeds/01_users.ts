import * as Knex from 'knex';

import { users } from '../seed-data/index';
import { IUserData } from '../../typescript/IUsers';
import hashPassword from '../utils/hashPassword';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries

  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');

  // need to hash user passwords before seeding db
  const hashedUsers = await Promise.all(
    users.map(
      async (userData: IUserData): Promise<IUserData> => {
        const hash: string = await hashPassword(userData);

        const hashedUser = {
          ...userData,
          password: hash,
        };

        return hashedUser;
      },
    ),
  );

  // Inserts seed entries
  await knex('users').insert(hashedUsers);
}

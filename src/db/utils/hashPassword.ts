import Argon2id from 'argon2';

import { IUserData } from '../../typescript/IUsers';

export default async (userData: IUserData): Promise<string> => {
  const hash = await Argon2id.hash(userData.password!);
  return hash;
};

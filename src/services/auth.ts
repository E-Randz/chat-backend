import { randomBytes } from 'crypto';
import { Service } from 'typedi';
import argon2 from 'argon2';

import { IAuthService } from '../typescript/IServices';
import { IUserData, IUser, IHashData } from '../typescript/IUsers';
import db from '../db';
import { Unauthorized, Conflict } from '../errors';

@Service()
export default class AuthService implements IAuthService {
  public async Register(userData: IUserData): Promise<IUser | undefined> {
    try {
      const hashedData = await this.hashPassword(userData);

      const userWithHash = {
        ...userData,
        salt: hashedData!.salt,
        password: hashedData!.hash,
      };

      const [user]: Array<IUser> = await db
        .insert(userData)
        .into('users')
        .returning(['id', 'first_name', 'last_name', 'email']);
      return user;
    } catch (err) {
      if (err.code === '23505') {
        throw new Conflict('User already exists in system.');
      }
      throw new Error();
    }
  }

  public async Login(userData: IUserData): Promise<IUser | undefined> {
    const [user]: Array<IUser> = await db
      .select('id', 'email', 'password')
      .from('users')
      .where({ email: userData.email });

    if (user.password === userData.password) {
      return { id: user.id };
    } else {
      throw new Unauthorized('Either the email or password is incorrect');
    }
  }

  private async hashPassword(
    userData: IUserData,
  ): Promise<IHashData | undefined> {
    const salt = randomBytes(32);
    try {
      const hash = await argon2.hash(userData.password, { salt });
      return { hash, salt };
    } catch (err) {
      console.log(err);
    }
  }
}

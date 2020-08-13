import { Service } from 'typedi';
import Argon2id from 'argon2';

import { IAuthService } from '../typescript/IServices';
import { IUserData, IUser } from '../typescript/IUsers';
import db from '../db';
import { Unauthorized, Conflict } from '../errors';

@Service()
export default class AuthService implements IAuthService {
  public async Register(userData: IUserData): Promise<IUser | undefined> {
    try {
      const hash = await this.HashPassword(userData);

      //!  Safety. userData never inserted directly into db but just in case!
      userData.password = undefined;

      const userWithHash = {
        ...userData,
        password: hash,
      };

      const [user]: Array<IUser> = await db
        .insert(userWithHash)
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

    const isUserVerified = await this.VerifyPassword(
      user.password!,
      userData.password!,
    );
    if (isUserVerified) {
      return { id: user.id };
    } else {
      throw new Unauthorized('Either the email or password is incorrect');
    }
  }

  private async HashPassword(userData: IUserData): Promise<string> {
    const hash = await Argon2id.hash(userData.password!);
    return hash;
  }

  private async VerifyPassword(
    hash: string,
    password: string,
  ): Promise<boolean> {
    return await Argon2id.verify(hash, password);
  }
}

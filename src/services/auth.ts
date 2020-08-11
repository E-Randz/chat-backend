import { Service } from 'typedi';
import { IAuthService } from '../interfaces/IServices';
import { IUserData, IUser } from '../interfaces/IUsers';
import db from '../db';
import { Unauthorized, Conflict } from '../errors';

@Service()
export default class AuthService implements IAuthService {
  public async Register(userData: IUserData): Promise<IUser | undefined> {
    try {
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
}

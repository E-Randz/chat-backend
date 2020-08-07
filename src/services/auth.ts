import { Service } from 'typedi';
import { IAuthService } from '../interfaces/IServices';
import { IUserData, IUser } from '../interfaces/IUsers';
import db from '../db';

@Service()
export default class AuthService implements IAuthService {
  public async Register(userData: IUserData): Promise<{ user: IUser }> {
    try {
      const user: IUser = await db
        .insert(userData)
        .into('users')
        .returning(['id', 'firstName', 'lastName', 'email']);

      return { user };
    } catch (err) {
      return err;
    }
  }
}

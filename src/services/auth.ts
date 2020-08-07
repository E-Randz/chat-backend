import { Service } from 'typedi';
import { IAuthService } from '../interfaces/IServices';
import { IUserData, IUser } from '../interfaces/IUsers';
import db from '../db';

@Service()
export default class AuthService implements IAuthService {
  public async Register(userData: IUserData): Promise<{ user: IUser }> {
    try {
      const [user]: Array<IUser> = await db
        .insert(userData)
        .into('users')
        .returning(['id', 'first_name', 'last_name', 'email']);

      return { user };
    } catch (err) {
      return err;
    }
  }
}

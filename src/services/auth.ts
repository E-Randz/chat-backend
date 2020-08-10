import { Service } from 'typedi';
import { IAuthService } from '../interfaces/IServices';
import { IUserData, IUser } from '../interfaces/IUsers';
import db from '../db';

@Service()
export default class AuthService implements IAuthService {
  public async Register(
    userData: IUserData,
  ): Promise<{ user?: IUser; err?: any }> {
    try {
      const [user]: Array<IUser> = await db
        .insert(userData)
        .into('users')
        .returning(['id', 'first_name', 'last_name', 'email']);
      return { user };
    } catch (err) {
      if (err.code === '23505') {
        return {
          err: {
            code: err.code,
            errors: [
              {
                msg: err.detail,
                param: 'email',
                location: 'body',
              },
            ],
          },
        };
      }
      return { err };
    }
  }
}

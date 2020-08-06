import { Service } from 'typedi';
import { IEndpointsService, IAuthService } from '../interfaces/IServices';
import { IUserData, IUser } from '../interfaces/IUsers';

@Service()
export default class AuthService implements IAuthService {
  public async Register(userData: IUserData): Promise<{ user: IUser }> {
    // TODO register endpoint
    const user = {
      id: 1,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    };
    return { user };
  }
}

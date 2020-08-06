import { IStringMap } from './IGeneric';
import { IUserData, IUser } from './IUsers';

export interface IEndpointsService {
  Endpoints: () => { endpoints: IStringMap };
}

export interface IAuthService {
  Register: (userData: IUserData) => Promise<{ user: IUser }>;
}

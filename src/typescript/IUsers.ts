export interface IUser {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export interface IUserData {
  email: string;
  password: string | undefined;
  firstName?: string;
  lastName?: string;
}

export interface IUser {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ILogin {
  login: string;
  password: string;
}

export interface IPassword {
  oldPassword: string;
  newPassword: string;
}

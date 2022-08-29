import {IUser, ILogin} from '../../types/user';

import AuthAPI from '../api/auth';

import {ROUTES} from '../../constants/constants';
import {router} from '../../index';
import store from '../store/store';
import {hasResponseError} from '../helpers';

export class AuthService {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async register(data: IUser): Promise<void> {
    const response = await this.api.register(data);

    if (hasResponseError(response)) {
      console.error(`Ошибка запроса: ${response.reason}`);
    } else {
      await this.getUser();
      router.go(ROUTES.CHATS);
    }
  }

  async login(data: ILogin): Promise<void> {
    const response = await this.api.login(data);

    if (hasResponseError(response)) {
      console.error(`Ошибка запроса: ${response.reason}`);
    } else {
      await this.getUser();
      router.go(ROUTES.CHATS);
    }
  }

  async getUser(): Promise<void> {
    const response = await this.api.getCurrentUser();
    if (hasResponseError(response)) {
      store.set('currentUser', null);
    } else {
      store.set('currentUser', response);
    }
  }

  async logout() {
    const response = await this.api.logout();
    if (hasResponseError(response)) {
      console.error(`Ошибка запроса: ${response.reason}`);
    } else {
      router.go(ROUTES.AUTH);
    }
  }
}

export default new AuthService();

import {IUser, ILogin} from '../../types/user';

import AuthAPI from '../api/auth';

import {ROUTES} from '../../constants/constants';
import {router} from '../../index';
import store from '../store/store';
import {hasResponseError} from '../helpers/validate';

export class AuthService {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async register(data: IUser): Promise<void> {
    try {
      const response = await this.api.register(data);

      if (hasResponseError(response)) {
        console.error(`Ошибка запроса: ${response.reason}`);
      } else {
        await this.getUser();
        router.go(ROUTES.CHATS);
      }
    } catch (error) {
      console.error(error)
    }
  }

  async login(data: ILogin): Promise<void> {
    try {
      const response = await this.api.login(data);

      if (hasResponseError(response)) {
        console.error(`Ошибка запроса: ${response.reason}`);
      } else {
        await this.getUser();
        router.go(ROUTES.CHATS);
      }
    } catch (error) {
      console.error(error)
    }
  }

  async getUser(): Promise<void> {
    try {
      const response = await this.api.getCurrentUser();
      if (hasResponseError(response)) {
        console.error(`Ошибка запроса: ${response.reason}`);
        store.set('currentUser', null);
      } else {
        store.set('currentUser', response);
      }
    } catch (error) {
      console.error(error)
    }
  }

  async logout() {
    try {
      const response = await this.api.logout();
      if (hasResponseError(response)) {
        console.error(`Ошибка запроса: ${response.reason}`);
        if (response.reason === 'Cookie is not valid') {
          router.go(ROUTES.AUTH);
        }
      } else {
        store.set('currentUser', null);
        router.go(ROUTES.AUTH);
        router.reload();
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export default new AuthService();

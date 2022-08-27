import {IRegister, ILogin} from '../../types/auth';

import AuthAPI from '../api/auth';

import {ROUTES} from '../../constants/constants';
import {router} from '../../index';
import store from '../store/store';
import {hasResponseError} from '../helpers';

class AuthService {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async register(data: IRegister): Promise<void> {
    await this.api.register(data);
    await this.getUser();

    router.go(ROUTES.CHATS);
  }

  async login(data: ILogin): Promise<void> {
    await this.api.login(data);
    await this.getUser();

    router.go(ROUTES.CHATS);
  }

  async getUser(): Promise<void> {
    const user = await this.api.getCurrentUser();
    if (hasResponseError(user)) {
      store.set('currentUser', null);
    } else {
      store.set('currentUser', user);
    }
  }

  async logout() {
    await this.api.logout();

    router.go(ROUTES.AUTH);
  }
}

export default new AuthService();

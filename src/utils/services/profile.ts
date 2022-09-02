import ProfileAPI from '../api/profile';
import {closeModal, hasResponseError} from '../helpers';
import store from '../store/store';
import {AuthService} from './auth';
import {IUser} from '../../types/user';
import {router} from '../../index';
import {ROUTES} from '../../constants/constants';

class ProfileService {
  private readonly _profileApiService = new ProfileAPI();
  private readonly _authService = new AuthService();

  public async searchUser(login: string) {
    return await this._profileApiService.searchUser(login);
  }

  public async uploadAvatar(avatar: FormData) {
    const response = await this._profileApiService.uploadAvatar(avatar);

    if (hasResponseError(response)) {
      console.error(`Ошибка запроса: ${response.reason}`);
    } else {
      store.set('currentUser.avatar', response.avatar);
      closeModal('upload-avatar');
    }
  }

  public async editPassword(oldPass: string, newPass: string) {
    const response = await this._profileApiService.editPassword(oldPass, newPass);

    if (hasResponseError(response)) {
      console.error(`Ошибка запроса: ${response.reason}`);
    } else {
      store.set('currentUser', null);
      await this._authService.logout();
    }
  }

  public async editUser(user: IUser) {
    const response = await this._profileApiService.editUser(user);

    if (hasResponseError(response)) {
      console.error(`Ошибка запроса: ${response.reason}`);
    } else {
      store.set('currentUser', response);
      router.go(ROUTES.PROFILE);
    }
  }
}

export default new ProfileService();

import ProfileAPI from '../api/profile';
import {closeModal, hasResponseError} from '../helpers';
import store from '../store/store';
import {IUser} from '../../types/user';
import {router} from '../../index';
import {ROUTES} from '../../constants/constants';
import {TStringObject} from '../../types/common';

class ProfileService {
  private readonly _profileApiService = new ProfileAPI();

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

  public async editPassword(formData: TStringObject) {
    const response = await this._profileApiService.editPassword(formData);

    if (hasResponseError(response)) {
      console.error(`Ошибка запроса: ${response.reason}`);
    } else {
      router.go(ROUTES.PROFILE);
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

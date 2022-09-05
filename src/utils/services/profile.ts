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
    try {
      return await this._profileApiService.searchUser(login);
    } catch (error) {
      console.error(error)
    }
  }

  public async uploadAvatar(avatar: FormData) {
    try {
      const response = await this._profileApiService.uploadAvatar(avatar);

      if (hasResponseError(response)) {
        console.error(`Ошибка запроса: ${response.reason}`);
      } else {
        store.set('currentUser.avatar', response.avatar);
        closeModal('upload-avatar');
      }
    } catch (error) {
      console.error(error)
    }
  }

  public async editPassword(formData: TStringObject) {
    try {
      const response = await this._profileApiService.editPassword(formData);

      if (hasResponseError(response)) {
        console.error(`Ошибка запроса: ${response.reason}`);
      } else {
        router.go(ROUTES.PROFILE);
      }
    } catch (error) {
      console.error(error)
    }
  }

  public async editUser(user: IUser) {
    try {
      const response = await this._profileApiService.editUser(user);

      if (hasResponseError(response)) {
        console.error(`Ошибка запроса: ${response.reason}`);
      } else {
        store.set('currentUser', response);
        router.go(ROUTES.PROFILE);
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export default new ProfileService();

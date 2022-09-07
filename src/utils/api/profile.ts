import {HTTPTransport} from '../http-transport/http-transport';
import {ResponseError, TStringObject} from '../../types/common';
import IProfile from '../../components/profile/interface';
import {IUser} from '../../types/user';

export default class ProfileAPI {
  private _http: HTTPTransport = new HTTPTransport();

  public searchUser(login: string) {
    return this._http.post<IProfile[] | ResponseError>(`/user/search`, {
      data: {login: login}
    });
  }

  public editUser(user: IUser) {
    return this._http.put<IProfile | ResponseError>(`/user/profile`, {
      data: user
    });
  }

  public editPassword(formData: TStringObject) {
    return this._http.put<undefined | ResponseError>(`/user/password`, {
      data: formData
    });
  }

  public uploadAvatar(avatar: FormData) {
    return this._http.put<IProfile | ResponseError>(`/user/profile/avatar`, {
      data: avatar
    });
  }
}

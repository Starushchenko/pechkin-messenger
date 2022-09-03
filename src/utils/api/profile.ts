import {HTTPTransport} from '../http-transport/http-transport';
import {ResponseError, TStringObject} from '../../types/common';
import IProfile from '../../components/profile/interface';
import {IUser} from '../../types/user';
import {API_URL} from '../../constants/constants';

export default class ProfileAPI {
  private _http: HTTPTransport = new HTTPTransport();
  private _apiURL = API_URL;

  public searchUser(login: string) {
    return this._http.post<IProfile[] | ResponseError>(`${this._apiURL}/user/search`, {
      headers: {'content-type': 'application/json'},
      data: {login: login}
    });
  }

  public editUser(user: IUser) {
    return this._http.put<IProfile | ResponseError>(`${this._apiURL}/user/profile`, {
      headers: {'content-type': 'application/json'},
      data: user
    });
  }

  public editPassword(formData: TStringObject) {
    return this._http.put<undefined | ResponseError>(`${this._apiURL}/user/password`, {
      headers: {'content-type': 'application/json'},
      data: formData
    });
  }

  public uploadAvatar(avatar: FormData) {
    return this._http.put<IProfile | ResponseError>(`${this._apiURL}/user/profile/avatar`, {
      data: avatar
    });
  }
}

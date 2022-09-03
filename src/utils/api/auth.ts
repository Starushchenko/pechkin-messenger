import {IUser, ILogin} from '../../types/user';
import {API_URL} from '../../constants/constants';
import {HTTPTransport} from '../http-transport/http-transport';

export default class AuthAPI {
  private _http: HTTPTransport = new HTTPTransport();
  private _apiURL = API_URL;

  register(data: IUser): Promise<XMLHttpRequestResponseType> {
    return this._http.post(`${this._apiURL}/auth/signup`, {
      headers: {'content-type': 'application/json'},
      data: data
    });
  }

  login(data: ILogin): Promise<XMLHttpRequestResponseType> {
    return this._http.post(`${this._apiURL}/auth/signin`, {
      headers: {'content-type': 'application/json'},
      data: data
    });
  }

  getCurrentUser(): Promise<XMLHttpRequestResponseType> {
    return this._http.get(`${this._apiURL}/auth/user`);
  }

  logout(): Promise<XMLHttpRequestResponseType> {
    return this._http.post(`${this._apiURL}/auth/logout`);
  }
}

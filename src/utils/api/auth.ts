import {IUser, ILogin} from '../../types/user';
import {HTTPTransport} from '../http-transport/http-transport';

export default class AuthAPI {
  private _http: HTTPTransport = new HTTPTransport();

  register(data: IUser): Promise<XMLHttpRequestResponseType> {
    return this._http.post(`/auth/signup`, {
      data: data
    });
  }

  login(data: ILogin): Promise<XMLHttpRequestResponseType> {
    return this._http.post(`/auth/signin`, {
      data: data
    });
  }

  getCurrentUser(): Promise<XMLHttpRequestResponseType> {
    return this._http.get(`/auth/user`);
  }

  logout(): Promise<XMLHttpRequestResponseType> {
    return this._http.post(`/auth/logout`);
  }
}

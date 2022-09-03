import {HTTPTransport} from '../http-transport/http-transport';
import {ResponseError} from '../../types/common';
import {API_URL} from '../../constants/constants';
import {IChat} from '../../types/chats';
import {IChatTitle, IChatToken} from '../../types/chats';

export default class ChatsAPI {
  private _http: HTTPTransport = new HTTPTransport();
  private _apiURL = API_URL;

  public getChat(id: number) {
    return this._http.get<IChat | ResponseError>(`${this._apiURL}/chats/${id}/common`);
  }

  public getChats(offset = 0, limit = 50, title = '') {
    return this._http.get<IChat[] | ResponseError>(`${this._apiURL}/chats`, {
      data: {offset, limit, title}
    });
  }

  public addChat(chat: IChatTitle) {
    return this._http.post<undefined | ResponseError>(`${this._apiURL}/chats`, {
      headers: {'content-type': 'application/json'},
      data: chat
    });
  }

  public deleteChat(chatId: number) {
    return this._http.delete<undefined | ResponseError>(`${this._apiURL}/chats`, {
      headers: {'content-type': 'application/json'},
      data: {
        chatId: chatId
      }
    });
  }

  public addUser(userId: number[], chatId: number) {
    return this._http.put<undefined | ResponseError>(`${this._apiURL}/chats/users`, {
      headers: {'content-type': 'application/json'},
      data: {
        users: userId,
        chatId: chatId
      }
    });
  }

  public deleteUsers(usersId: number[], chatId: number) {
    return this._http.delete<undefined | ResponseError>(`${this._apiURL}/chats/users`, {
      headers: {'content-type': 'application/json'},
      data: {
        users: usersId,
        chatId: chatId
      }
    });
  }

  public getToken(id: number) {
    return this._http.post<IChatToken | ResponseError>(`${this._apiURL}/chats/token/${id}`, {
      headers: {'content-type': 'application/json'}
    });
  }
}

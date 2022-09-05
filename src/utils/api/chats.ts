import {HTTPTransport} from '../http-transport/http-transport';
import {ResponseError} from '../../types/common';
import {IChat} from '../../types/chats';
import {IChatTitle, IChatToken} from '../../types/chats';

export default class ChatsAPI {
  private _http: HTTPTransport = new HTTPTransport();

  public getChat(id: number) {
    return this._http.get<IChat | ResponseError>(`/chats/${id}/common`);
  }

  public getChats(offset = 0, limit = 50, title = '') {
    return this._http.get<IChat[] | ResponseError>(`/chats`, {
      data: {offset, limit, title}
    });
  }

  public addChat(chat: IChatTitle) {
    return this._http.post<undefined | ResponseError>(`/chats`, {
      data: chat
    });
  }

  public deleteChat(chatId: number) {
    return this._http.delete<undefined | ResponseError>(`/chats`, {
      data: {
        chatId: chatId
      }
    });
  }

  public addUser(userId: number[], chatId: number) {
    return this._http.put<undefined | ResponseError>(`/chats/users`, {
      data: {
        users: userId,
        chatId: chatId
      }
    });
  }

  public deleteUsers(usersId: number[], chatId: number) {
    return this._http.delete<undefined | ResponseError>(`/chats/users`, {
      data: {
        users: usersId,
        chatId: chatId
      }
    });
  }

  public getToken(id: number) {
    return this._http.post<IChatToken | ResponseError>(`/chats/token/${id}`, {});
  }
}

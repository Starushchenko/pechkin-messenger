import store from '../store/store';
import {closeModal, formatDate, hasResponseError} from '../helpers';
import ProfileService from '../services/profile';
import ChatsAPI from '../api/chats';
import {IChatTitle} from '../../types/chats';
import Socket from '../api/socket';

class ChatService {
  private readonly _chatAPI: ChatsAPI;
  private readonly _authService;
  private _socket: Socket | null;

  constructor() {
    this._chatAPI = new ChatsAPI();
    this._authService = ProfileService;
    this._socket = null;
  }

  public async getChats() {
    const chats = await this._chatAPI.getChats();
    if (hasResponseError(chats)) {
      console.error(chats.reason)
    } else {
      chats.map((chat) => {
        if (chat.last_message) {
          const day = new Date(chat.last_message.time);
          chat.last_message.time = formatDate(day);
        }
      });
      store.set('chats', chats);
    }
  }

  public async addChat(chat: IChatTitle) {
    const result = await this._chatAPI.addChat(chat);
    if (hasResponseError(result)) {
      console.error(result.reason);
    } else {
      this.getChats();
    }
    closeModal('add-chat');
  }

  public async addUser(login: string, chatId: number) {
    const user = await this._authService.searchUser(login);
    
    if (hasResponseError(user)) {
      console.error(user.reason);
      return;
    }
    if (user.length === 0) {
      console.error('Пользователь не найден');
      return;
    }

    const result = await this._chatAPI.addUser([user[0].id as unknown as number], chatId);
    
    if (!hasResponseError(result)) {
      await this.getChats();
    } else {
      console.error(result.reason);
      // TODO: действие после добавления пользователя в чат
    }
  }

  public async deleteUser(login: string, chatId: number) {
    const user = await this._authService.searchUser(login);
    if (hasResponseError(user)) {
      console.error(user.reason);
      return;
    }

    if (user.length === 0) {
      console.error(`Не найден пользователь с id ${login}`);
      return;
    }

    const result = await this._chatAPI.deleteUsers([user[0].id as unknown as number], chatId);
    if (hasResponseError(result)) {
      console.error(result.reason);
    } else {
      await this.getChats();
      // TODO: действие после удаления пользователя из чата
    }
  }

  public async deleteChat(id: number) {
    const result = await this._chatAPI.deleteChat(id);
    if (hasResponseError(result)) {
      console.error(result.reason);
    } else {
      await this.getChats();
      store.set('currentChat.chat.id', null);
      // TODO: действие после удаления пользователя из чата
    }
  }

  public async connectSocket(userId: number, chatId: number) {
    const {token} = await this._chatAPI.getToken(chatId) as unknown as Record<string, unknown>;
    const endpoint = `${userId}/${chatId}/${token}`;

    this._socket = new Socket(endpoint);
  }

  public async sendMessage(message: string) {
    if (this._socket) {
      this._socket.sendMessage(message);
      await this.getChats();
    }
  }
}

export default new ChatService();

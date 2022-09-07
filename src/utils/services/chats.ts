import store from '../store/store';
import ProfileService from '../services/profile';
import ChatsAPI from '../api/chats';
import {IChatTitle} from '../../types/chats';
import Socket from '../api/socket';
import {hasResponseError} from '../helpers/validate';
import {formatDate} from '../helpers/format-data';
import {closeModal} from '../helpers/dom';

class ChatService {
  private readonly _chatAPI: ChatsAPI;
  private readonly _profileService;
  private _socket: Socket | null;

  constructor() {
    this._chatAPI = new ChatsAPI();
    this._profileService = ProfileService;
    this._socket = null;
  }

  public async getChats() {
    try {
      const chats = await this._chatAPI.getChats();
      if (hasResponseError(chats)) {
        console.error(chats.reason)
      } else {
        const result = [...chats];
        result.map((chat) => {
          if (chat.last_message) {
            const day = new Date(chat.last_message.time);
            chat.last_message.time = formatDate(day);
          }
        });
        store.set('chats', result);
      }
    } catch (error) {
      console.error(error)
    }
  }

  public async addChat(chat: IChatTitle) {
    try {
      const result = await this._chatAPI.addChat(chat);
      if (hasResponseError(result)) {
        console.error(result.reason);
      } else {
        await this.getChats();
        closeModal('add-chat');
      }
    } catch (error) {
      console.error(error)
    }
  }

  public async addUser(login: string, chatId: number) {
    try {
      const user = await this._profileService.searchUser(login);

      if (hasResponseError(user)) {
        console.error(user.reason);
        return;
      }

      if (!user) return;
      if (user.length === 0) {
        console.error(`Не найден пользователь с id ${login}`);
        return;
      }

      const result = await this._chatAPI.addUser([user[0].id as unknown as number], chatId);

      if (hasResponseError(result)) {
        console.error(result.reason);
      } else {
        await this.getChats();
        closeModal('add-user');
        await this.sendMessage(`${login} приземлился в чат. Поприветствуйте!`);
      }
    } catch (error) {
      console.error(error)
    }
  }

  public async deleteUser(login: string, chatId: number) {
    try {
      const user = await this._profileService.searchUser(login);
      if (hasResponseError(user)) {
        console.error(user.reason);
        return;
      }

      if (!user) return;
      if (user.length === 0) {
        console.error(`Не найден пользователь с id ${login}`);
        return;
      }

      const result = await this._chatAPI.deleteUsers([user[0].id as unknown as number], chatId);
      if (hasResponseError(result)) {
        console.error(result.reason);
      } else {
        await this.getChats();
        closeModal('delete-user');
      }
    } catch (error) {
      console.error(error)
    }
  }

  public async deleteChat(id: number) {
    try {
      const result = await this._chatAPI.deleteChat(id);
      if (hasResponseError(result)) {
        console.error(result.reason);
      } else {
        await this.getChats();
        store.set('currentChat.chat', null);
        closeModal('delete-chat');
      }
    } catch (error) {
      console.error(error)
    }
  }

  public async connectSocket(userId: number, chatId: number) {
    try {
      const {token} = await this._chatAPI.getToken(chatId) as unknown as Record<string, unknown>;
      const endpoint = `${userId}/${chatId}/${token}`;

      this._socket = new Socket(endpoint);
    } catch (error) {
      console.error(error)
    }
  }

  public async sendMessage(message: string) {
    try {
      if (this._socket) {
        this._socket.sendMessage(message);
        await this.getChats();
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export default new ChatService();

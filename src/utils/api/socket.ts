import {WEBSOCKET_CHATS_URL} from '../../constants/constants';
import store from '../store/store';
import {formatDate} from '../helpers';
import {IMessage} from '../../types/chats';

export default class Socket {
  private _socket;
  private _timeout?: NodeJS.Timer;

  constructor(endpoint: string) {
    this._socket = new WebSocket(`${WEBSOCKET_CHATS_URL}${endpoint}`);
    this._timeout = undefined;
    this.startSocketListeners();
  }

  private startSocketListeners() {
    this._socket.addEventListener('open', () => {
      clearInterval(this._timeout);
      this.ping();
      this.getMessages('0');
    });

    this._socket.addEventListener('message', (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data
        && data.type !== 'error'
        && data.type !== 'pong'
        && data.type !== 'user connected'
      ) {
        this.formatMessages(data);
        if (Array.isArray(data)) {
          store.set('currentChat.messages', data);
        } else {
          store.set('currentChat.messages', [
            ...store.getState().currentChat?.messages, data
          ]);
        }
      }
    });

    this._socket.addEventListener('close', (event: CloseEvent) => {
      if (event.wasClean) {
        store.set('currentChat.messages', []);
      } else {
        console.error('[chat socket] Соединение прервано');
      }
      console.warn(`[chat socket] Закрытие соединения, причина: ${event.reason}`);
    });

    this._socket.addEventListener('error', (error: Event) => {
      console.error(`[chat socket] Ошибка: ${error}`);
    });
  }

  private ping() {
    this._timeout = setInterval(() => {
      this._socket.send(JSON.stringify({
        type: 'ping'
      }));
    }, 1000);
  }

  private getMessages(count: string) {
    this._socket.send(
      JSON.stringify({
        content: count,
        type: 'get old',
      })
    );
  }
  
  private formatMessages(data: IMessage | IMessage[]) {
    if (!Array.isArray(data)) {
      const day = new Date(data.time);
      data.time = formatDate(day);
    } else {
      data.sort((a, b) => {
        return Date.parse(a.time) - Date.parse(b.time);
      });
      data.map((item: IMessage) => {
        const day = new Date(item.time);
        item.time = formatDate(day);
        item.not_mine = (!store.getState().currentUser || store.getState().currentUser?.id !== item.user_id);
      })
    }
  }

  public sendMessage(message: string) {
    this._socket.send(
      JSON.stringify({
        content: message,
        type: 'message',
      })
    );
  }
}

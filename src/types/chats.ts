import {IUser} from './user';
import {TEvents} from './common';

export interface IChat {
  messages: any;
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  last_message: {
    user: IUser,
    time: string,
    content: string
  };
  events?: TEvents;
}

export interface IChatItem {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: IUser,
    time: string,
    content: string
  };
  events?: TEvents;
}

export interface IChatTitle {
  title: string;
}

export interface IChatToken {
  token: string;
}

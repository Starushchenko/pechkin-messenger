import {IChat, IChatItem} from './chats';
import {IUser} from './user';

export interface IStoreState {
  chats: IChatItem[];
  currentChat?: IChat;
  currentUser?: IUser;
}

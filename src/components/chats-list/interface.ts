import {TEvents} from '../../types/common';
import {IChatItem} from '../../types/chats';

interface IChatsList {
  emptyText?: string;
  chats?: IChatItem[];
}

export interface IAddChatButton {
  events?: TEvents;
}

export default IChatsList;

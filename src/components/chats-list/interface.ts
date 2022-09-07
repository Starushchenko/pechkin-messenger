import {TEvents} from '../../types/common';
import {IChatItem} from '../../types/chats';

interface IChatsList {
  emptyText?: string;
  chats?: IChatItem[];
  events?: TEvents;
}

export default IChatsList;

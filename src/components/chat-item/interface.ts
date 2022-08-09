import {TEvents} from '../../types/common';

interface IChatPreview {
  name: string;
  lastMessage: string;
  avatar?: HTMLImageElement | string | boolean;
  lastMessageIsMine?: boolean;
  lastMessageDatetime?: string;
  unreadCount?: number;
  events?: TEvents;
}

export default IChatPreview;

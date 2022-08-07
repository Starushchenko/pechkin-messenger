import {TEvents} from '../../types/common';

interface IChatHeader {
  name?: string;
  avatar?: HTMLImageElement | string | boolean;
  events?: TEvents;
}

export default IChatHeader;

import {set} from '../helpers';
import EventBus from '../event-bus';
import {STORE_EVENTS} from '../../constants/constants';
import IChatPreview from '../../components/chat-item/interface';
import IChat from '../../modules/chat/interface';
import IProfile from '../../components/profile/interface';

export interface IState {
  chats: IChatPreview[];
  currentUser?: IProfile;
  activeChat?: IChat;
}

class Store extends EventBus {
  private state: IState = {
    chats: [],
  };

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(STORE_EVENTS.UPDATED);
  }
}

const store = new Store();
export default store;

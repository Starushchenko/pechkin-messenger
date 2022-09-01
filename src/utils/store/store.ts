import {set} from '../helpers';
import EventBus from '../event-bus';
import {STORE_EVENTS} from '../../constants/constants';
import {IStoreState} from '../../types/store';

export class Store extends EventBus {
  private state: IStoreState = {
    chats: [],
    currentChat: undefined,
    currentUser: undefined
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

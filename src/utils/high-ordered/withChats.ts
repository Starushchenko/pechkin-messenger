import withStore from './withStore';

import {IStoreState} from '../../types/store';

export const withChats = withStore((state: IStoreState) => {
  return { chats: { ...state.chats } };
});

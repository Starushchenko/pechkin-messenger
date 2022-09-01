import withStore from './withStore';
import {IStoreState} from '../../types/store';

export const withChat = withStore((state: IStoreState) => ({ ...state.currentChat }));

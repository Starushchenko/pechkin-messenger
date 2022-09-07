import withStore from './withStore';
import {IStoreState} from '../../types/store';

export const withUser = withStore((state: IStoreState) => ({ 
  ...state.currentUser
}));

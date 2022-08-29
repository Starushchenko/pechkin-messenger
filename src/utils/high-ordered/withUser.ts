import withStore from './withStore';
import {IState} from '../store/store';

export const withUser = withStore((state: IState) => ({ 
  ...state.currentUser
}));

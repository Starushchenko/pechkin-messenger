import Block from '../block';
import {isEqual} from '../helpers';
import store from '../store/store';
import {IStoreState} from '../../types/store';
import {STORE_EVENTS} from '../../constants/constants';

const withStore = (mapStateToProps: (state: IStoreState) => Record<string, unknown>) => (Component: typeof Block) => {
    let state: Record<string, unknown>;
    return class extends Component {
      constructor(props: Record<string, unknown>) {
        state = mapStateToProps(store.getState());
        super({...props, ...state});
        store.on(STORE_EVENTS.UPDATED, () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(state, newState)) {
            this.setProps({
              ...newState,
            });
          }
        });
      }
    };
  };

export default withStore;

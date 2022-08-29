import {TEvents} from '../../types/common';
import IProfile from '../../components/profile/interface';

interface IForm {
  title?: string;
  classes?: string;
  events?: TEvents;
  currentUser?: IProfile;
}

export default IForm;

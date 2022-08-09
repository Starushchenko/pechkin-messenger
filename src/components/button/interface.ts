import {TEvents} from '../../types/common';

interface IButton {
  text?: string;
  classes?: string;
  icon?: string;
  type?: string;
  events?: TEvents;
}

export default IButton;

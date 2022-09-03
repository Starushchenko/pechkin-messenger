import {TEvents} from '../../types/common';
import Block from '../../utils/block/block';

interface IModal {
  id?: string;
  title?: string;
  classes?: string;
  text?: string;
  content?: Block | HTMLElement;
  events?: TEvents;
}

export default IModal;

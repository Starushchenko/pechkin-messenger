import IDropdownItem from '../dropdown-item/interface';
import {TEvents} from '../../types/common';

interface IDropdown {
  classes?: string;
  items?: IDropdownItem[];
  events?: TEvents;
}

export default IDropdown;

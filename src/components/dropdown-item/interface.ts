import {TEvents} from '../../types/common';

interface IDropdownItem {
  href?: string;
  icon?: HTMLElement & SVGElement;
  title?: string;
  events?: TEvents;
}

export default IDropdownItem;

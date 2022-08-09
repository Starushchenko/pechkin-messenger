import {TEvents} from '../../types/common';

interface IDropdownItem {
  href?: string;
  icon?: HTMLElement & SVGElement | string;
  title?: string;
  classes?: string;
  events?: TEvents;
}

export default IDropdownItem;

import Block from '../../utils/block/block';
import IDropdownItem from './interface';

import template from './dropdown.tpl.hbs';

class Dropdown extends Block {
  constructor(props: IDropdownItem) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props});
  }
}

export default Dropdown;

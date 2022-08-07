import Block from '../../utils/Block';
import IDropdownItem from './interface';

import template from './dropdown.tpl.hbs';

class DropdownItem extends Block {
  constructor(props: IDropdownItem) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props});
  }
}

export default DropdownItem;

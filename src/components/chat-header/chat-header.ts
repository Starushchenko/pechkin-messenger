import Block from '../../utils/Block';
import IChatHeader from './interface';
import LogoPlaceholder from '../../../assets/images/svg/placeholder.svg'
import chatMenu = require('../../stubs/chat-menu.json');

import template from './chat-header.tpl.hbs';

import Dropdown from '../dropdown/dropdown';
import {onDropdownTrigger} from '../../utils/dropdownTrigger';

class ChatHeader extends Block {
  constructor(props: IChatHeader) {
    super(props);
    
    this.onDropdownClick()
  }


  onDropdownClick() {
    const dropdownTrigger = this.element?.querySelector('.js-dropdown-trigger');
    onDropdownTrigger(dropdownTrigger);
  }

  protected initChildren() {
    this.children['dropdown'] = new Dropdown({
      classes: 'dropdown--right',
      items: chatMenu
    });
  }

  render() {
    if (!this.props.avatar) {
      this.props.avatar = LogoPlaceholder;
    }
    return this.compile(template, {...this.props});
  }
}

export default ChatHeader;

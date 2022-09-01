import Block from '../../utils/block';
import IChatHeader from './interface';
import chatMenu = require('../../stubs/chat-menu.json');

import template from './chat-header.tpl.hbs';

import Dropdown from '../dropdown/dropdown';
import {onDropdownTrigger} from '../dropdown/helpers';
import {withChat} from '../../utils/high-ordered/withChat';

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
    return this.compile(template, {
      data: this.props.chat ? this.props.chat[0] : false,
      ...this.props
    });
  }
}

export default withChat(ChatHeader);

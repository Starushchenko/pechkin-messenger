import Block from '../../utils/block';
import IChatActions from './interface';
import {VALIDATION_RULES} from '../../constants/constants';
import filesMenu = require('../../stubs/files-menu.json');

import template from './chat-actions.tpl.hbs';

import FormField from '../form-field/form-field';
import Button from '../button/button';
import Dropdown from '../dropdown/dropdown';
import {onDropdownTrigger} from '../dropdown/helpers';
import {withChat} from '../../utils/high-ordered/withChat';

class ChatActions extends Block {
  constructor(props: IChatActions) {
    super(props);

    this.onDropdownClick()
  }

  onDropdownClick() {
    const trigger = this.element?.querySelector('.js-dropdown-trigger');
    onDropdownTrigger(trigger);
  }

  protected initChildren() {
    this.children['dropdown'] = new Dropdown({
      classes: 'dropdown--top',
      items: filesMenu
    });
    
    this.children['message-field'] = new FormField({
      name: 'message',
      label: 'Сообщение',
      errorText: VALIDATION_RULES.MESSAGE.errorText,
      field: {
        type: 'text',
        name: 'message',
        placeholder: 'Введите текст',
        required: true,
        rule: VALIDATION_RULES.MESSAGE.rule,
        noValidateOnBlur: true
      }
    });
    
    this.children['submit-button'] = new Button({
      text: 'message',
      type: 'submit',
      classes: 'button--icon',
      icon: 
        `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="10.2" width="11" height="1.6" fill="white"/>
          <path d="M12 6L16 11L12 16" stroke="white" stroke-width="1.6"/>
        </svg>`,
    });
  }
  
  render() {
    return this.compile(template, {
      data: this.props.chat ? this.props.chat[0] : false,
      ...this.props
    });
  }
}

export default withChat(ChatActions);

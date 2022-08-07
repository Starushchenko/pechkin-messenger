import Block from '../../utils/Block';
import IChatActions from './interface';
import {MESSAGE} from '../../enums/validation-rules';

import template from './chat-actions.tpl.hbs';

import FormField from '../form-field/form-field';
import Button from '../button/button';

class ChatActions extends Block {
  constructor(props: IChatActions) {
    super(props);
  }

  protected initChildren() {
    this.children['message-field'] = new FormField({
      name: 'message',
      label: 'Сообщение',
      errorText: MESSAGE.errorText,
      field: {
        type: 'text',
        name: 'message',
        placeholder: 'Введите текст',
        required: true,
        rule: MESSAGE.rule
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
    return this.compile(template, {...this.props});
  }
}

export default ChatActions;

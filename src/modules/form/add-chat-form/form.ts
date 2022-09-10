import Block from '../../../utils/block/block';
import IForm from "../interface";
import {VALIDATION_RULES} from '../../../constants/constants';

import FormField from '../../../components/form-field/form-field';
import Button from '../../../components/button/button';

import * as template from './form.tpl.hbs';

class AddChatForm extends Block {
  constructor(props: IForm) {
    super(props);
  }

  protected initChildren() {
    this.children['add-chat-field'] = new FormField({
      name: 'add_chat',
      label: 'Название чата',
      errorText: VALIDATION_RULES.CHAT.errorText,
      field: {
        type: 'text',
        name: 'add_chat',
        placeholder: 'Например, чат друзей',
        minlength: 5,
        maxlength: 70,
        required: true,
        rule: VALIDATION_RULES.CHAT.rule
      }
    });

    this.children['button-save'] = new Button({
      text: 'Добавить',
      type: 'submit'
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default AddChatForm;

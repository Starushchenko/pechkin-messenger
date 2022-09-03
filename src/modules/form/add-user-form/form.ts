import Block from '../../../utils/block/block';
import IForm from "../interface";
import {VALIDATION_RULES} from '../../../constants/constants';

import FormField from '../../../components/form-field/form-field';
import Button from '../../../components/button/button';

import template from './form.tpl.hbs';

class AddUserForm extends Block {
  constructor(props: IForm) {
    super(props);
  }

  protected initChildren() {
    this.children['add-user-field'] = new FormField({
      name: 'add_user',
      label: 'Логин пользователя',
      errorText: VALIDATION_RULES.LOGIN.errorText,
      field: {
        type: 'text',
        name: 'login',
        placeholder: 'Например, ivanov123',
        minlength: 3,
        maxlength: 20,
        required: true,
        rule: VALIDATION_RULES.LOGIN.rule
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

export default AddUserForm;

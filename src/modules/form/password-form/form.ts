import Block from '../../../utils/block/block';
import IForm from "../interface";
import {VALIDATION_RULES} from '../../../constants/constants';

import FormField from '../../../components/form-field/form-field';
import Button from '../../../components/button/button';

import template from './form.tpl.hbs';

class PasswordForm extends Block {
  constructor(props: IForm) {
    super(props);
  }

  protected initChildren() {
    this.children['old-password-field'] = new FormField({
      name: 'oldPassword',
      label: 'Старый пароль',
      errorText: VALIDATION_RULES.PASSWORD.errorText,
      field: {
        type: 'password',
        name: 'oldPassword',
        placeholder: '****************',
        minlength: 8,
        maxlength: 40,
        required: true,
        rule: VALIDATION_RULES.PASSWORD.rule
      }
    });

    this.children['password-field'] = new FormField({
      name: 'newPassword',
      label: 'Новый пароль',
      errorText: VALIDATION_RULES.PASSWORD.errorText,
      field: {
        type: 'password',
        name: 'newPassword',
        confirmField: 'passwordConfirm',
        placeholder: '****************',
        minlength: 8,
        maxlength: 40,
        required: true,
        rule: VALIDATION_RULES.PASSWORD.rule
      }
    });

    this.children['password-confirm-field'] = new FormField({
      name: 'passwordConfirm',
      label: 'Повторите пароль',
      errorText: VALIDATION_RULES.CONFIRM.errorText,
      field: {
        type: 'password',
        name: 'passwordConfirm',
        placeholder: '****************',
        minlength: 8,
        maxlength: 40,
        required: true,
        rule: VALIDATION_RULES.PASSWORD.rule
      }
    });

    this.children['button-save'] = new Button({
      text: 'Сохранить',
      type: 'submit'
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default PasswordForm;

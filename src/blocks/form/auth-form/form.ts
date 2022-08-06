import Block from '../../../utils/Block';
import IForm from "../interface";
import {LOGIN, PASSWORD} from '../../../enums/validation-rules';

import FormField from '../../../components/form-field/form-field';
import Button from '../../../components/button/button';

import template from './form.tpl.hbs';

class AuthForm extends Block {
  constructor(props: IForm) {
    super(props);
  }

  protected initChildren() {
    this.childrens['login-field'] = new FormField({
      name: 'login',
      label: 'Ваш логин',
      errorText: LOGIN.errorText,
      field: {
        type: 'text',
        name: 'login',
        placeholder: 'Например, ivanoff123',
        minlength: 3,
        maxlength: 20,
        required: true,
        rule: LOGIN.rule
      }
    });

    this.childrens['password-field'] = new FormField({
      name: 'password',
      label: 'Пароль',
      errorText: PASSWORD.errorText,
      field: {
        type: 'password',
        name: 'password',
        placeholder: '****************',
        minlength: 8,
        maxlength: 40,
        required: true,
        rule: PASSWORD.rule
      }
    });

    this.childrens['button-auth'] = new Button({
      text: 'Авторизоваться',
      type: 'submit'
    });

    this.childrens['button-register'] = new Button({
      text: 'Нет аккаунта?',
      classes: 'button--link'
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default AuthForm;

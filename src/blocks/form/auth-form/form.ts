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
    this.children['login-field'] = new FormField({
      name: 'login',
      label: 'Логин',
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

    this.children['password-field'] = new FormField({
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

    this.children['button-auth'] = new Button({
      text: 'Авторизоваться',
      type: 'submit'
    });

    this.children['button-register'] = new Button({
      text: 'Нет аккаунта?',
      classes: 'button--link',
      type: 'button',
      events: {
        click: (e) => this.onRegisterLinkClick(e),
      },
    });
  }

  onRegisterLinkClick(e: Event) : void {
    e.preventDefault();
    location.replace("/register/");
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default AuthForm;

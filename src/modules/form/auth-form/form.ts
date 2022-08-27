import Block from '../../../utils/block';
import IForm from "../interface";
import {ROUTES, VALIDATION_RULES} from '../../../constants/constants';

import FormField from '../../../components/form-field/form-field';
import Button from '../../../components/button/button';

import template from './form.tpl.hbs';
import {router} from '../../../index';

class AuthForm extends Block {
  constructor(props: IForm) {
    super(props);
  }

  protected initChildren() {
    this.children['login-field'] = new FormField({
      name: 'login',
      label: 'Логин',
      errorText: VALIDATION_RULES.LOGIN.errorText,
      field: {
        type: 'text',
        name: 'login',
        placeholder: 'Например, ivanoff123',
        minlength: 3,
        maxlength: 20,
        required: true,
        rule: VALIDATION_RULES.LOGIN.rule
      }
    });

    this.children['password-field'] = new FormField({
      name: 'password',
      label: 'Пароль',
      errorText: VALIDATION_RULES.PASSWORD.errorText,
      field: {
        type: 'password',
        name: 'password',
        placeholder: '****************',
        minlength: 8,
        maxlength: 40,
        required: true,
        rule: VALIDATION_RULES.PASSWORD.rule
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
    router.go(ROUTES.REGISTER);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default AuthForm;

import Block from '../../../utils/Block';
import IForm from "../interface";
import {EMAIL, LOGIN, NAME, PHONE, PASSWORD} from '../../../constants/validation-rules';

import FormField from '../../../components/form-field/form-field';
import Button from '../../../components/button/button';

import template from './form.tpl.hbs';

class RegisterForm extends Block {
  constructor(props: IForm) {
    super(props);
  }

  protected initChildren() {
    this.children['email-field'] = new FormField({
      name: 'email',
      label: 'Электронная почта',
      errorText: EMAIL.errorText,
      field: {
        type: 'email',
        name: 'email',
        placeholder: 'Например, ivanoff@yandex.ru',
        required: true,
        rule: EMAIL.rule
      }
    });
    
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

    this.children['name-field'] = new FormField({
      name: 'name',
      label: 'Имя',
      errorText: NAME.errorText,
      field: {
        type: 'text',
        name: 'name',
        placeholder: 'Например, Константин',
        required: true,
        rule: NAME.rule
      }
    });

    this.children['second-name-field'] = new FormField({
      name: 'second_name',
      label: 'Фамилия',
      errorText: NAME.errorText,
      field: {
        type: 'text',
        name: 'second_name',
        placeholder: 'Например, Иванов',
        required: true,
        rule: NAME.rule
      }
    });

    this.children['second-name-field'] = new FormField({
      name: 'phone',
      label: 'Телефон',
      errorText: PHONE.errorText,
      field: {
        type: 'text',
        name: 'phone',
        placeholder: '+7 911 911 91 91',
        required: true,
        rule: PHONE.rule
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

    this.children['password-confirm-field'] = new FormField({
      name: 'password-confirm',
      label: 'Пароль (ещё раз)',
      errorText: PASSWORD.errorText,
      field: {
        type: 'password',
        name: 'password-confirm',
        placeholder: '****************',
        minlength: 8,
        maxlength: 40,
        required: true,
        rule: PASSWORD.rule
      }
    });

    this.children['button-register'] = new Button({
      text: 'Зарегистрироваться',
      type: 'submit'
    });

    this.children['button-auth'] = new Button({
      text: 'Войти',
      classes: 'button--link',
      type: 'button',
      events: {
        click: (e) => this.onLoginLinkClick(e),
      }
    });
  }

  onLoginLinkClick(e: Event) : void {
    e.preventDefault();
    location.replace("/auth/");
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default RegisterForm;

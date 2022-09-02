import Block from '../../../utils/block';
import IForm from "../interface";
import {ROUTES, VALIDATION_RULES} from '../../../constants/constants';

import FormField from '../../../components/form-field/form-field';
import Button from '../../../components/button/button';

import template from './form.tpl.hbs';
import {router} from '../../../index';

// TODO: Сделать валидацию для подтверждения пароля

class RegisterForm extends Block {
  constructor(props: IForm) {
    super(props);
  }

  protected initChildren() {
    this.children['email-field'] = new FormField({
      name: 'email',
      label: 'Электронная почта',
      errorText: VALIDATION_RULES.EMAIL.errorText,
      field: {
        type: 'email',
        name: 'email',
        placeholder: 'Например, ivanoff@yandex.ru',
        required: true,
        rule: VALIDATION_RULES.EMAIL.rule
      }
    });
    
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

    this.children['first-name-field'] = new FormField({
      name: 'first_name',
      label: 'Имя',
      errorText: VALIDATION_RULES.NAME.errorText,
      field: {
        type: 'text',
        name: 'first_name',
        placeholder: 'Например, Константин',
        required: true,
        rule: VALIDATION_RULES.NAME.rule
      }
    });

    this.children['second-name-field'] = new FormField({
      name: 'second_name',
      label: 'Фамилия',
      errorText: VALIDATION_RULES.NAME.errorText,
      field: {
        type: 'text',
        name: 'second_name',
        placeholder: 'Например, Иванов',
        required: true,
        rule: VALIDATION_RULES.NAME.rule
      }
    });

    this.children['phone-field'] = new FormField({
      name: 'phone',
      label: 'Телефон',
      errorText: VALIDATION_RULES.PHONE.errorText,
      field: {
        type: 'text',
        name: 'phone',
        placeholder: '+7 911 911 91 91',
        required: true,
        rule: VALIDATION_RULES.PHONE.rule
      }
    });

    this.children['password-field'] = new FormField({
      name: 'password',
      label: 'Пароль',
      errorText: VALIDATION_RULES.PASSWORD.errorText,
      field: {
        type: 'password',
        name: 'password',
        confirmField: 'password-confirm',
        placeholder: '****************',
        minlength: 8,
        maxlength: 40,
        required: true,
        rule: VALIDATION_RULES.PASSWORD.rule
      }
    });

    this.children['password-confirm-field'] = new FormField({
      name: 'password-confirm',
      label: 'Пароль (ещё раз)',
      errorText: VALIDATION_RULES.CONFIRM.errorText,
      field: {
        type: 'password',
        name: 'password-confirm',
        placeholder: '****************',
        required: true,
        rule: VALIDATION_RULES.PASSWORD.rule
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
    router.go(ROUTES.AUTH);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default RegisterForm;

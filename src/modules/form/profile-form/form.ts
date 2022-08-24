import Block from '../../../utils/block';
import IForm from "../interface";
import {VALIDATION_RULES} from '../../../constants/constants';

import FormField from '../../../components/form-field/form-field';
import Button from '../../../components/button/button';

import template from './form.tpl.hbs';

class ProfileForm extends Block {
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
        value: 'pochta@yandex.ru',
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
        value: 'konstantin_ivanov',
        rule: VALIDATION_RULES.LOGIN.rule
      }
    });

    this.children['name-field'] = new FormField({
      name: 'name',
      label: 'Имя',
      errorText: VALIDATION_RULES.NAME.errorText,
      field: {
        type: 'text',
        name: 'name',
        placeholder: 'Например, Константин',
        required: true,
        value: 'Константин',
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
        value: 'Иванов',
        rule: VALIDATION_RULES.NAME.rule
      }
    });

    this.children['nickname-field'] = new FormField({
      name: 'nickname',
      label: 'Имя в чате',
      errorText: VALIDATION_RULES.LOGIN.errorText,
      field: {
        type: 'text',
        name: 'nickname',
        placeholder: 'Например, mr_ivanoff',
        required: false,
        value: 'Mr_ivanoff',
        rule: VALIDATION_RULES.LOGIN.rule
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
        value: '+79099673030',
        rule: VALIDATION_RULES.PHONE.rule
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

export default ProfileForm;

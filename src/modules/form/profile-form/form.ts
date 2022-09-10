import Block from '../../../utils/block/block';
import IForm from "../interface";
import {VALIDATION_RULES} from '../../../constants/constants';

import FormField from '../../../components/form-field/form-field';
import Button from '../../../components/button/button';

import * as template from './form.tpl.hbs';
import store from '../../../utils/store/store';
import {withUser} from '../../../utils/high-ordered/withUser';

class ProfileForm extends Block {
  constructor(props: IForm) {
    super(props);
  }

  protected componentDidMount() {
    this._updateFieldValues();
  }

  protected onStoreUpdate() {
    this._updateFieldValues();
  }
  
  private _updateFieldValues() {
    const currentUser: Record<string, any> | undefined = store.getState().currentUser;
    if (currentUser) {
      Object.keys(currentUser).forEach((value) => {
        const child = this.getChildren()[value];
        if (child && child.getChildren().field) {
          child.getChildren().field.setProps({ value: currentUser[value]});
        }
      })
    }
  }

  protected initChildren() {
    this.children['email'] = new FormField({
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
    
    this.children['login'] = new FormField({
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

    this.children['first_name'] = new FormField({
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

    this.children['second_name'] = new FormField({
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

    this.children['display_name'] = new FormField({
      name: 'display_name',
      label: 'Имя в чате',
      errorText: VALIDATION_RULES.LOGIN.errorText,
      field: {
        type: 'text',
        name: 'display_name',
        placeholder: 'Например, mr_ivanoff',
        required: false,
        rule: VALIDATION_RULES.LOGIN.rule
      }
    });

    this.children['phone'] = new FormField({
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

    this.children['button-save'] = new Button({
      text: 'Сохранить',
      type: 'submit'
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default withUser(ProfileForm);

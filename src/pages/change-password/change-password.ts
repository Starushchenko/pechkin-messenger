import Block from '../../utils/block/block';

import Button from '../../components/button/button';

import template from './change-password.tpl.hbs';
import PasswordForm from '../../modules/form/password-form/form';
import {formatFormData} from '../../utils/helpers';
import {router} from '../../index';
import store from '../../utils/store/store';
import {ROUTES} from '../../constants/constants';
import ProfileService from '../../utils/services/profile';

export default class ChangePassword extends Block {
  protected onStoreUpdate() {
    if (!store.getState().currentUser) {
      router.go(ROUTES.AUTH);
    }
  }
  
  protected initChildren() {
    this.children['button-back'] = new Button({
      classes: 'button--icon app__back-btn',
      text: 'Назад',
      icon: `
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="17" y="11.8" width="11" height="1.6" transform="rotate(-180 17 11.8)" fill="white"/>
          <path d="M10 16L6 11L10 6" stroke="white" stroke-width="1.6"/>
        </svg>
      `,
      events: {
        click: (e) => this.onStepBack(e),
      }
    });

    this.children['password-form'] = new PasswordForm({
      title: 'Константин',
      events: {
        submit: (e) => this.onSubmit(e),
      },
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    ProfileService.editPassword(formatFormData(formData));
  }

  onStepBack(e: Event) {
    e.preventDefault();
    router.back();
  }


  render() {
    return this.compile(template, {});
  }
}

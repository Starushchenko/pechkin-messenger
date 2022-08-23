import Block from '../../utils/block';
import Button from '../../components/button/button';
import ProfileForm from '../../blocks/form/profile-form/form';

import template from './change-settings.tpl.hbs';
import {formatFormData} from '../../utils/helpers';

export default class ChangeSettings extends Block {
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

    this.children['profile-form'] = new ProfileForm({
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
    console.log(formatFormData(formData));
  }

  onStepBack(e: Event) {
    e.preventDefault();
    history.back();
  }


  render() {
    return this.compile(template, {});
  }
}

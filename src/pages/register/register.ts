import Block from '../../utils/Block';
import renderDOM from '../../utils/renderDOM';
import {TStringObject} from '../../types/common';
import {formatFormData} from '../../utils/helpers';

import Image from '../../../assets/images/welcome.png';
import RegisterForm from '../../blocks/form/register-form/form';
import Welcome from '../../components/welcome/welcome';

import template from './register.hbs';

const classes: TStringObject = {
  FORM_CLASS: 'app__sidebar-form'
};

class AuthPage extends Block {
  protected initChildren() {

    this.children['auth-form'] = new RegisterForm({
      classes: classes.FORM_CLASS,
      events: {
        submit: (e) => this.onSubmit(e),
      },
    });

    this.children.welcome = new Welcome({
      title: 'Pechkin Messenger',
      desc: 'место, где нет преград общению',
      image: Image
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    console.log(formatFormData(formData));
  }


  render() {
    return this.compile(template, {});
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const page = new AuthPage();

  renderDOM('#app', page);
});

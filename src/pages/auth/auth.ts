import Block from '../../utils/block/block';
import {TStringObject} from '../../types/common';

import Image from '../../../assets/images/welcome.png';
import AuthForm from '../../modules/form/auth-form/form';
import Welcome from '../../components/welcome/welcome';

import template from './auth.tpl.hbs';
import AuthService from '../../utils/services/auth';
import ChatService from '../../utils/services/chats';
import {ILogin} from '../../types/user';
import store from '../../utils/store/store';
import {router} from '../../index';
import {ROUTES} from '../../constants/constants';
import {formatFormData} from '../../utils/helpers/format-data';

const classes: TStringObject = {
  FORM_CLASS: 'app__sidebar-form'
};

export default class AuthPage extends Block {
  protected onStoreUpdate() {
    if (store.getState().currentUser) {
      router.go(ROUTES.CHATS);
    }
  }
  
  protected initChildren() {
    this.children['auth-form'] = new AuthForm({
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

  protected onSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    AuthService.login(formatFormData(formData) as unknown as ILogin).then(() => {
      ChatService.getChats()
    });
  }

  public render() {
    return this.compile(template, {});
  }
}

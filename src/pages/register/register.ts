import Block from '../../utils/block';
import {router} from '../../index';
import store from '../../utils/store/store';
import {TStringObject} from '../../types/common';
import {IRegister} from '../../types/auth';
import IProfile from '../../components/profile/interface';
import {formatFormData} from '../../utils/helpers';

import AuthService from  '../../utils/services/auth';

import Image from '../../../assets/images/welcome.png';
import RegisterForm from '../../modules/form/register-form/form';
import Welcome from '../../components/welcome/welcome';
import {ROUTER_EVENTS, ROUTES, STORE_EVENTS} from '../../constants/constants';

import template from './register.hbs';

const classes: TStringObject = {
  FORM_CLASS: 'app__sidebar-form'
};

export default class RegisterPage extends Block {
  constructor() {
    super();

    store.on(STORE_EVENTS.UPDATED, this.checkUserExist);
    router.on(ROUTER_EVENTS.CHANGED, this.checkUserExist);
  }
  
  protected componentDidMount() {
    this.checkUserExist();
  }

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

  protected onSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    AuthService.register(formatFormData(formData) as unknown as IRegister);
  }

  protected checkUserExist(): void {
    const currentUser: IProfile | undefined | null = store.getState().currentUser;
    if (currentUser) {
      router.go(ROUTES.CHATS);
    }
  }

  public render() {
    return this.compile(template, {});
  }
}

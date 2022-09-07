import Block from '../../utils/block/block';
import IProfile from './interface';

import {router} from '../../index';
import {ROUTES} from '../../constants/constants';
import AuthService from  '../../utils/services/auth';

import template from './profile.tpl.hbs';
import {withUser} from '../../utils/high-ordered/withUser';
import Link from '../link/link';

class Profile extends Block {
  constructor(props: IProfile | undefined) { 
    super(props);
  }
  
  protected initChildren() {
    this.children['profile_edit_link'] = new Link({
      text: 'Изменить данные',
      events: {
        click: (e) => {
          e.preventDefault();
          router.go(ROUTES.CHANGE_SETTINGS)
        }
      }
    });

    this.children['password_edit_link'] = new Link({
      text: 'Изменить пароль',
      events: {
        click: (e) => {
          e.preventDefault();
          router.go(ROUTES.CHANGE_PASSWORD)
        }
      }
    });

    this.children['logout_link'] = new Link({
      classes: 'link--alert',
      text: 'Выйти',
      events: {
        click: (e) => {
          e.preventDefault();
          AuthService.logout();
        }
      }
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default withUser(Profile);

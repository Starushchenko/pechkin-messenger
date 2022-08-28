import Block from '../../utils/block';
import IProfile from './interface';

import {router} from '../../index';
import {ROUTES} from '../../constants/constants';
import AuthService from  '../../utils/services/auth';

import template from './profile.tpl.hbs';
import store from '../../utils/store/store';

class Profile extends Block {
  constructor(props: IProfile | undefined) { 
    super(props);

    this.profileEditLink?.addEventListener('click', () => { router.go(ROUTES.CHANGE_SETTINGS) });
    this.passwordEditLink?.addEventListener('click', () => { router.go(ROUTES.CHANGE_PASSWORD) });
    this.logoutLink?.addEventListener('click', () => { AuthService.logout() });
  }
  
  private _currentUser: IProfile | undefined = store.getState().currentUser;

  protected componentDidMount() {
    this._currentUser = store.getState().currentUser;
    this.setProps(this._currentUser)
  }

  protected storeUpdated() {
    this._currentUser = store.getState().currentUser;
    this.setProps(this._currentUser)
  }

  profileEditLink = this.element?.querySelector('.js-profile-edit');
  passwordEditLink = this.element?.querySelector('.js-password-edit');
  logoutLink = this.element?.querySelector('.js-profile-logout');

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Profile;

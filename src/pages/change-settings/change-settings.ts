import Block from '../../utils/block/block';
import Button from '../../components/button/button';
import ProfileForm from '../../modules/form/profile-form/form';

import * as template from './change-settings.tpl.hbs';
import {router} from '../../index';
import ProfileService from '../../utils/services/profile';
import {IUser} from '../../types/user';
import store from '../../utils/store/store';
import {ROUTES} from '../../constants/constants';
import Modal from '../../components/modal/modal';
import UploadAvatarForm from '../../modules/form/upload-avatar/form';
import {formatFormData} from '../../utils/helpers/format-data';
import {openModal} from '../../utils/helpers/dom';

export default class ChangeSettings extends Block {
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

    this.children['profile-form'] = new ProfileForm({
      title: store.getState().currentUser?.first_name,
      events: {
        click: (e: Event) => this.listenAvatarModal(e),
        submit: (e: Event) => this.onSubmit(e)
      },
    });

    this.children['upload-avatar-modal'] = new Modal({
      id: 'upload-avatar',
      title: 'Поменять аватар',
      content: new UploadAvatarForm({
        events: {
          submit: (e: Event) => this.onAvatarUpload(e)
        }
      })
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    ProfileService.editUser(formatFormData(formData) as unknown as IUser);
  }

  onStepBack(e: Event) {
    e.preventDefault();
    router.back();
  }

  listenAvatarModal(e: Event) {
    const target = e.target as HTMLElement;
    if (target.classList.contains('js-edit-avatar')) {
      openModal('upload-avatar');
    }
  }

  onAvatarUpload(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    ProfileService.uploadAvatar(formData);
  }

  render() {
    return this.compile(template, {});
  }
}

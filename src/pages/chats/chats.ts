import Block from '../../utils/block/block';
import Logo from '../../../assets/images/logo.png';

import Button from '../../components/button/button';
import AppLogo from '../../components/app-logo/app-logo';
import Search from '../../components/search/search';
import ChatsList from '../../components/chats-list/chats-list';

import * as template from './chats.tpl.hbs';
import {router} from '../../index';
import {ROUTES} from '../../constants/constants';
import store from '../../utils/store/store';
import Chat from '../../modules/chat/chat';
import ChatService from '../../utils/services/chats';

export default class ChatsPage extends Block {
  protected onStoreUpdate() {
    if (!store.getState().currentUser) {
      router.go(ROUTES.AUTH);
    }
  }
  
  protected initChildren() {
    this.children['app-logo'] = new AppLogo({
      name: 'Pechkin',
      image: Logo
    });

    this.children['profile-button'] = new Button({
      text: 'Профиль',
      classes: 'button--light button--icon-r app__profile-link',
      icon: `
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.43127 2.79106C7.76745 1.06806 10.2325 1.06806 10.5687 2.79106C10.7733 3.83954 11.929 4.39611 12.8762 3.90232C14.4329 3.09084 15.97 5.01819 14.8324 6.35527C14.1402 7.1689 14.4256 8.4195 15.4023 8.85225C17.0074 9.56332 16.4588 11.9667 14.7042 11.911C13.6365 11.8771 12.8367 12.88 13.1073 13.9134C13.552 15.6116 11.331 16.6812 10.2805 15.2747C9.6414 14.4188 8.3586 14.4188 7.71945 15.2747C6.66898 16.6812 4.44793 15.6116 4.89267 13.9134C5.1633 12.88 4.36351 11.8771 3.29581 11.911C1.5412 11.9667 0.992646 9.56332 2.59766 8.85225C3.57433 8.4195 3.85977 7.1689 3.16757 6.35527C2.03005 5.01819 3.56706 3.09084 5.12374 3.90232C6.071 4.39611 7.22673 3.83954 7.43127 2.79106Z" stroke="#BBBBBB" stroke-width="1.5"/>
          <path d="M11.25 9C11.25 10.2427 10.2427 11.25 9 11.25C7.75732 11.25 6.75 10.2427 6.75 9C6.75 7.75732 7.75732 6.75 9 6.75C10.2427 6.75 11.25 7.75732 11.25 9Z" stroke="#BBBBBB" stroke-width="1.5"/>
        </svg>
      `,
      events: {
        click: (e) => this.onProfileClick(e),
      }
    });

    this.children['search'] = new Search({
      description: 'Поиск по чатам',
      query: ''
    });

    this.children['chats-list'] = new ChatsList({
      emptyText: 'Добавьте свой первый чат',
      chats: [],
      events: {
        click: (e: Event) => this.onActiveChatTrigger(e)
      }
    });

    this.children['chat'] = new Chat({});
  }

  onProfileClick(e: Event) {
    e.preventDefault();
    router.go(ROUTES.PROFILE);
  }

  onActiveChatTrigger(e: Event) {
    const target = e.target as HTMLAnchorElement;
    if (target.hasAttribute('data-chat-id')) {
      e.preventDefault();
      const chatID = Number(target.getAttribute('data-chat-id'));
      const state = store.getState();
      const currentChat = state.chats?.filter((item) => item.id === chatID);
      const userID = state.currentUser?.id;

      if (chatID && userID) {
        store.set('currentChat.chat', currentChat);
        ChatService.connectSocket(userID, chatID);
      }
    }
  }

  render() {
    return this.compile(template, {});
  }
}

import Block from '../../utils/block';
import IChatHeader from './interface';

import template from './chat-header.tpl.hbs';

import DropdownItem from '../dropdown-item/dropdown-item';
import {withChat} from '../../utils/high-ordered/withChat';
import Modal from '../modal/modal';
import AddUserForm from '../../modules/form/add-user-form/form';
import DeleteUserForm from '../../modules/form/delete-user-form/form';
import {formatFormData, openModal} from '../../utils/helpers';
import ChatsService from '../../utils/services/chats';
import DeleteChatForm from '../../modules/form/delete-chat-form/form';

class ChatHeader extends Block {
  constructor(props: IChatHeader) {
    super(props);
  }

  protected initChildren() {
    this.children['add-user-link'] = new DropdownItem({
      title: 'Добавить пользователя',
      icon: '<svg width="22" height="22" fill="none"><circle cx="11" cy="11" r="10.25"' +
        ' stroke="#1EB759" stroke-width="1.5"/><path stroke="#1EB759" stroke-width="1.5" d="M11 5.5v11M5.5 11h11"/></svg>',
      events: {
        click: (e: Event) => this.openUserModal(e)
      }
    });

    this.children['delete-user-link'] = new DropdownItem({
      title: 'Удалить пользователя',
      icon: '<svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="10.25" stroke="#1EB759" stroke-width="1.5"/><path stroke="#1EB759" stroke-width="1.5" d="m7.111 7.111 7.778 7.778M7.111 14.889l7.778-7.778"/></svg>',
      events: {
        click: (e: Event) => this.openDeleteUserModal(e)
      }
    });

    this.children['delete-chat-link'] = new DropdownItem({
      classes: 'dropdown__item--alert',
      title: 'Удалить чат',
      icon: '<svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="10.25" stroke="#1EB759" stroke-width="1.5"/><path stroke="#1EB759" stroke-width="1.5" d="m7.111 7.111 7.778 7.778M7.111 14.889l7.778-7.778"/></svg>',
      events: {
        click: (e: Event) => this.openDeleteChatModal(e)
      }
    });

    this.children['add-user-modal'] = new Modal({
      id: 'add-user',
      title: 'Добавить пользователя по id',
      content: new AddUserForm({
        events: {
          submit: (e: Event) => this.onUserAdd(e),
        }
      })
    });

    this.children['delete-user-modal'] = new Modal({
      id: 'delete-user',
      title: 'Удалить пользователя по id',
      content: new DeleteUserForm({
        events: {
          submit: (e: Event) => this.onUserDelete(e),
        }
      })
    });

    this.children['delete-chat-modal'] = new Modal({
      id: 'delete-chat',
      title: 'Вы уверены, что хотите удалить чат ?',
      content: new DeleteChatForm({
        events: {
          submit: (e: Event) => this.onChatDelete(e),
        }
      })
    });
  }

  openUserModal(e: Event) {
    e.preventDefault();
    openModal('add-user');
  }

  onUserAdd(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = formatFormData(new FormData(form));

    ChatsService.addUser(formData.login, this.props.chat[0].id);
  }

  openDeleteUserModal(e: Event) {
    e.preventDefault();
    openModal('delete-user');
  }

  onUserDelete(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = formatFormData(new FormData(form));

    ChatsService.deleteUser(formData.login, this.props.chat[0].id);
  }

  openDeleteChatModal(e: Event) {
    e.preventDefault();
    openModal('delete-chat');
  }

  onChatDelete(e: Event) {
    e.preventDefault();
    const chatID = this.props.chat[0].id;
    ChatsService.deleteChat(chatID);
  }

  render() {
    return this.compile(template, {
      data: this.props.chat ? this.props.chat[0] : false,
      ...this.props
    });
  }
}

export default withChat(ChatHeader);

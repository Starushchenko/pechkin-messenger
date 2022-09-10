import Block from '../../utils/block/block';
import IChatsList from './interface';
import {withChats} from '../../utils/high-ordered/withChats';

import * as template from './chats-list.tpl.hbs';
import AddChatButton from '../chats-list/add-chat-button';
import Modal from '../modal/modal';
import AddChatForm from '../../modules/form/add-chat-form/form';
import ChatsService from '../../utils/services/chats';
import {formatFormData} from '../../utils/helpers/format-data';
import {openModal} from '../../utils/helpers/dom';

class ChatsList extends Block {
  constructor(props: IChatsList) {
    super(props);
  }

  protected initChildren() {
    this.children['button'] = new AddChatButton({
      events: {
        click: (e: Event) => this.onChatModalOpen(e)
      }
    });
    
    this.children['add-chat-modal'] = new Modal({
      id: 'add-chat',
      title: 'Добавить чат',
      content: new AddChatForm({
        events: {
          submit: (e: Event) => this.onChatAdd(e)
        }
      })
    });
  }

  onChatModalOpen(e: Event) {
    e.preventDefault();
    openModal('add-chat');
  }

  onChatAdd(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    ChatsService.addChat({title: formatFormData(formData).add_chat as unknown as string})
  }

  render() {
    return this.compile(template, {...this.props});
  }
}

export default withChats(ChatsList);

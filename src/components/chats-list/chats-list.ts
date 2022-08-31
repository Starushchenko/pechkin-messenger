import Block from '../../utils/block';
import IChatsList from './interface';
import {withChats} from '../../utils/high-ordered/withChats';

import template from './chats-list.tpl.hbs';
import AddChatButton from './add-chat-button';
import Modal from '../modal/modal';
import {formatFormData, openModal} from '../../utils/helpers';
import AddChatForm from '../../modules/form/add-chat-form/form';
import ChatsService from '../../utils/services/chats';

class ChatsList extends Block {
  constructor(props: IChatsList) {
    super(props);
  }

  protected initChildren() {
    this.children['add-chat-button'] = new AddChatButton({
      events: {
        click: (e: Event) => this.onChatModalOpen(e)
      }
    });
    
    this.children['add-chat-modal'] = new Modal({
      id: 'add-chat',
      title: 'Добавить чат',
      content: new AddChatForm({
        events: {
          submit: (e) => this.onChatAdd(e),
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

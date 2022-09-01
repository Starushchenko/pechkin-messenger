import Block from '../../utils/block';
import IChat from './interface';

import template from './chat.tpl.hbs';

import ChatHeader from '../../components/chat-header/chat-header';
import ChatConversation from '../../components/chat-conversation/chat-conversation';
import ChatActions from '../../components/chat-actions/chat-actions';
import {formatFormData} from '../../utils/helpers';
import ChatService from '../../utils/services/chats';

class Chat extends Block {
  constructor(props: IChat) {
    super(props);
  }

  protected initChildren() {
    this.children['chat-header'] = new ChatHeader({});
    
    this.children['chat-conversation'] = new ChatConversation({});

    this.children['chat-actions'] = new ChatActions({
      events: {
        submit: (e: Event) => this.onMessageSend(e)
      }
    });
  }

  onMessageSend(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = formatFormData(new FormData(form));
    ChatService.sendMessage(formData.message);
    form.reset();
  }

  render() {
    return this.compile(template, {...this.props});
  }
}

export default Chat;

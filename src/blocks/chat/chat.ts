import Block from '../../utils/Block';
import IChat from './interface';

import template from './chat.tpl.hbs';

import ChatHeader from '../../components/chat-header/chat-header';
import ChatConversation from '../../components/chat-conversation/chat-conversation';1
import ChatActions from '../../components/chat-actions/chat-actions';
import {formatFormData} from '../../utils/helpers';

class Chat extends Block {
  constructor(props: IChat) {
    super(props);
  }

  protected initChildren() {
    this.children['chat-header'] = new ChatHeader(this.props.chatHeader);
    
    this.children['chat-conversation'] = new ChatConversation(this.props.chatConversation);

    this.children['chat-actions'] = new ChatActions({
      events: {
        submit: (e) => this.onMessageSend(e)
      }
    });
  }

  onMessageSend(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    console.log(formatFormData(formData));
  }

  render() {
    return this.compile(template, {...this.props});
  }
}

export default Chat;

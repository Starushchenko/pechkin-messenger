import Block from '../../utils/block/block';
import IChat from './interface';

import * as template from './chat.tpl.hbs';

import ChatHeader from '../../components/chat-header/chat-header';
import ChatConversation from '../../components/chat-conversation/chat-conversation';
import ChatActions from '../../components/chat-actions/chat-actions';
import ChatService from '../../utils/services/chats';
import {formatFormData} from '../../utils/helpers/format-data';
import {onDropdownTrigger} from '../../utils/helpers/dom';

class Chat extends Block {
  constructor(props: IChat) {
    super(props);
  }

  protected initChildren() {
    this.children['chat-header'] = new ChatHeader({
      events: {
        click: (e: Event) => this.onDropdownTrigger(e)
      }
    });
    
    this.children['chat-conversation'] = new ChatConversation({});

    this.children['chat-actions'] = new ChatActions({
      events: {
        submit: (e: Event) => this.onMessageSend(e),
        click: (e: Event) => this.onDropdownTrigger(e)
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

  onDropdownTrigger(e: Event) {
    const trigger = e.target as HTMLElement;
    if (trigger.classList.contains('js-dropdown-trigger')) {
      onDropdownTrigger(trigger);
    }
  }

  render() {
    return this.compile(template, {...this.props});
  }
}

export default Chat;

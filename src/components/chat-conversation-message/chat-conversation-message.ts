import Block from '../../utils/Block';
import IChatConversationMessage from './interface';

import template from './chat-conversation-message.tpl.hbs';

class ChatConversationMessage extends Block {
  constructor(props: IChatConversationMessage) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props});
  }
}

export default ChatConversationMessage;

import Block from '../../utils/block';
import IChatConversation from './interface';
import {withChat} from '../../utils/high-ordered/withChat';

import template from './chat-conversation.tpl.hbs';

class ChatConversation extends Block {
  constructor(props: IChatConversation) {
    super(props);
  }

  render() {
    return this.compile(template, {
      isChatOpen: !!this.props.chat,
      messages: this.props.messages,
      ...this.props
    });
  }
}

export default withChat(ChatConversation);

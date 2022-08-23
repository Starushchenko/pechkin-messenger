import Block from '../../utils/block';
import IChatConversation from './interface';

import template from './chat-conversation.tpl.hbs';

import Placeholder from '../placeholder/placeholder';

class ChatConversation extends Block {
  constructor(props: IChatConversation) {
    super(props);
  }

  protected initChildren() {
    this.children['placeholder'] = new Placeholder({
      text: 'История чата пуста. Напишите первым!'
    });
  }

  render() {
    return this.compile(template, {...this.props});
  }
}

export default ChatConversation;

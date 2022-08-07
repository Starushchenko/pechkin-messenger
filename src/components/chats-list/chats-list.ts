import Block from '../../utils/Block';
import IChatsList from './interface';
import IChatPreview from '../chat-item/interface';

import LogoPlaceholder from '../../images/svg/placeholder.svg'

import template from './chats-list.tpl.hbs';

class ChatsList extends Block {
  constructor(props: IChatsList) {
    super(props);
  }

  render() {
    this.props.chats.forEach((chat: IChatPreview) => {
      if (!chat.avatar) {
        chat.avatar = LogoPlaceholder;
      }
    })
    return this.compile(template, {...this.props});
  }
}

export default ChatsList;

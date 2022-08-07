import Block from '../../utils/Block';
import IChatHeader from './interface';

import LogoPlaceholder from '../../images/svg/placeholder.svg'

import template from './chat-header.tpl.hbs';

class ChatHeader extends Block {
  constructor(props: IChatHeader) {
    super(props);
  }

  render() {
    if (!this.props.avatar) {
      this.props.avatar = LogoPlaceholder;
    }
    return this.compile(template, {...this.props});
  }
}

export default ChatHeader;

import Block from '../../utils/Block';
import IChatPreview from './interface';

import LogoPlaceholder from '../../images/svg/placeholder.svg'

import template from './chats-item.tpl.hbs';

class ChatsItem extends Block {
  constructor(props: IChatPreview) {
    super(props);
  }

  render() {
    if (!this.props.avatar) {
      this.props.avatar = LogoPlaceholder;
    }
    return this.compile(template, {...this.props});
  }
}

export default ChatsItem;

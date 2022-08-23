import Block from '../../utils/block';
import IChatPreview from './interface';

import LogoPlaceholder from '../../../assets/images/svg/placeholder.svg'

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

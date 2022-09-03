import Block from '../../utils/block/block';
import {IChatItem} from '../../types/chats';

import LogoPlaceholder from '../../../assets/images/svg/placeholder.svg'

import template from './chats-item.tpl.hbs';

class ChatsItem extends Block {
  constructor(props: IChatItem) {
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

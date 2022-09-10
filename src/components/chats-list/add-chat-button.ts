import Block from '../../utils/block/block';
import IButton from '../button/interface';

import * as template from './add-chat-btn.tpl.hbs';

class AddChatButton extends Block {
  constructor(props: IButton) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default AddChatButton;

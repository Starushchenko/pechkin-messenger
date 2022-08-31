import Block from '../../utils/block';

import template from './add-chat-btn.tpl.hbs';

class AddChatButton extends Block {
  constructor(props: { events: { click: (e: Event) => void } }) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default AddChatButton;

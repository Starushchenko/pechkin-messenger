import Block from '../../utils/Block';

import template from './button.tpl.hbs';

interface IButton {
  text?: string;
  classes?: string;
  icon?: string;
}

class Button extends Block {
  constructor(props: IButton) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Button;

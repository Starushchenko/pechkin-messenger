import Block from '../../utils/Block';
import IButton from "./interface";

import template from './button.tpl.hbs';

class Button extends Block {
  constructor(props: IButton) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Button;

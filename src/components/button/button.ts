import Block from '../../utils/block';
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

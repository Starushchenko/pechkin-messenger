import Block from '../../utils/block/block';
import IPlaceholder from "./interface";

import template from './placeholder.tpl.hbs';

class Placeholder extends Block {
  constructor(props: IPlaceholder) { 
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Placeholder;

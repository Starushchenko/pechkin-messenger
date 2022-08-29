import Block from '../../utils/block';
import ILink from "./interface";

import template from './link.tpl.hbs';

class Link extends Block {
  constructor(props: ILink) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Link;

import Block from '../../utils/Block';
import IField from "./interface";

import template from './field.hbs';

class Field extends Block {
  constructor(props: IField) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Field;

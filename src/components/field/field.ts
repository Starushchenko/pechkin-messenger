import Block from '../../utils/block/block';
import IField from "./interface";

import * as template from './field.hbs';

class Field extends Block {
  constructor(props: IField) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Field;

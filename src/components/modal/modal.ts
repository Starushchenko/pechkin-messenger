import Block from '../../utils/block/block';
import IModal from "./interface";

import * as template from './modal.tpl.hbs';

class Modal extends Block {
  constructor(props: IModal) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Modal;

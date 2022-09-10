import Block from '../../../utils/block/block';
import IForm from "../interface";
import Button from '../../../components/button/button';

import * as template from './form.tpl.hbs';

class DeleteChatForm extends Block {
  constructor(props: IForm) {
    super(props);
  }

  protected initChildren() {
    this.children['button-save'] = new Button({
      text: 'Удалить чат',
      type: 'submit',
      classes: 'button--alert'
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default DeleteChatForm;

import Block from '../../../utils/block/block';
import IForm from "../interface";
import Button from '../../../components/button/button';

import template from './form.tpl.hbs';
import Field from '../../../components/field/field';

class UploadAvatarForm extends Block {
  constructor(props: IForm) {
    super(props);
  }

  protected initChildren() {
    this.children['file-field'] = new Field({
      name: 'avatar',
      type: 'file',
      noValidateOnBlur: true,
      events: {
        change: (e: Event) => this.onFileAdd(e)
      }
    });
    
    this.children['button-save'] = new Button({
      text: 'Сохранить',
      type: 'submit'
    });
  }

  onFileAdd(e: Event) {
    const field = e.target as HTMLInputElement;
    const form = document.querySelector('.upload-avatar');
    const info = form?.querySelector('.upload-avatar__info');
    const path = field.value.split('\\');
    const title = path[path.length - 1];
    
    if (title.length > 0 && info) {
      info.textContent = title;
    } else if (info) {
      info.textContent = '';
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default UploadAvatarForm;

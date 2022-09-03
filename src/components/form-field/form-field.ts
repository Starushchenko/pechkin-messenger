import Block from '../../utils/block/block';
import IFormField from './interface';
import {TStringObject} from '../../types/common';
import {isValid, getErrorText} from '../../utils/helpers';
import Field from '../field/field';

import template from './form-field.tpl.hbs';

const classes: TStringObject = {
  FIELD_INFO: 'form-field__info',
  FIELD_HAS_ERROR: 'form-field--error'
};

class FormField extends Block {
  constructor(props: IFormField) {
    super(props);
  }

  fieldInfoElement = this.element?.querySelector('.' + classes.FIELD_INFO);

  protected initChildren(): void {
    this.children.field = new Field({
      ...this.props.field,
      events: {
        focus: (e) => this.onFocus(e.target as HTMLInputElement),
        blur: (e) => this.onBlur(e.target as HTMLInputElement),
        change: (e) => this.checkRelatedFields(e.target as HTMLInputElement)
      },
    });
  }

  render() {
    return this.compile(template, {...this.props});
  }

  onFocus(field: HTMLInputElement | null): void {
    if (field && field.value && !field.hasAttribute('data-no-blur-validate')) {
      this.validate(field);
    }
  }

  onBlur(field: HTMLInputElement): void {
    if (field && !field.hasAttribute('data-no-blur-validate')) {
      this.validate(field);
    }
  }

  validate(field?: HTMLInputElement | null): void {
    if (!field) {
      return;
    }
    if (!isValid(field)) {
      if (this.element) {
        this.element.classList.add(classes.FIELD_HAS_ERROR)
      }
      if (this.fieldInfoElement && this.fieldInfoElement instanceof HTMLElement) {
        this.fieldInfoElement.innerText = getErrorText(field, this.props.errorText);
      }
    } else {
      if (this.element) {
        this.element.classList.remove(classes.FIELD_HAS_ERROR)
      }
      if (this.fieldInfoElement && this.fieldInfoElement instanceof HTMLElement) {
        this.fieldInfoElement.innerText = '';
      }
    }
  }

  checkRelatedFields(field: HTMLInputElement): void {
    if (field.hasAttribute('data-confirm-field')) {
      const relatedField = document.querySelector(
        `[name='${field.getAttribute('data-confirm-field')}']`
      ) as HTMLInputElement;
      relatedField.pattern = field.value;
    }
  }
}

export default FormField;

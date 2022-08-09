import Block from '../../utils/Block';
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

    this.fieldElement?.addEventListener('focus', this.onFocus.bind(this));
    this.fieldElement?.addEventListener('blur', this.onBlur.bind(this));
  }

  isOnInputValidateEnabled = false;
  
  fieldElement = this.element?.querySelector('input');
  
  fieldInfoElement = this.element?.querySelector('.' + classes.FIELD_INFO);

  render() {
    return this.compile(template, {...this.props});
  }

  onFocus(): void {
    if (this.fieldElement && this.fieldElement.value) {
      this.validate(this.fieldElement);
    }
  }

  onBlur(): void {
    if (this.fieldElement) {
      this.validate(this.fieldElement);
      if (!isValid(this.fieldElement) && !this.isOnInputValidateEnabled) {
        this.fieldElement?.addEventListener('input', this.onInput.bind(this));
        this.isOnInputValidateEnabled = true;
      }
    }
  }

  onInput(): void {
    this.validate(this.fieldElement);
  }

  validate(field?: HTMLInputElement | null): void {
    if (!field) return;
    if (!isValid(field)) {
      if (this.element) {
        this.element.classList.add(classes.FIELD_HAS_ERROR)
      }
      if (this.fieldInfoElement && this.fieldInfoElement instanceof HTMLElement) {
        this.fieldInfoElement.innerText = getErrorText(field, this.props.errorText);
      }
      if (!this.isOnInputValidateEnabled) {
        this.fieldElement?.addEventListener('input', this.onInput.bind(this));
        this.isOnInputValidateEnabled = true;
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

  protected initChildren(): void {
    this.children.field = new Field({...this.props.field});
  }
}

export default FormField;

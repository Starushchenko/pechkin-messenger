import {TStringObject} from '../types/common';

export const getErrorText = (field: HTMLInputElement, errorText: string) => {
  if (field.validity.patternMismatch && errorText) {
    return errorText;
  }
  return field.validationMessage;
};

export const isValid = (field: HTMLInputElement) => {
  return field.validity.valid;
};

export const formatFormData = (data: FormData) => {
  const result: TStringObject = {};
  for(const [name, value] of data) {
    if (typeof value === 'string') {
      result[name] = value;
    }
  }
  return result;
};

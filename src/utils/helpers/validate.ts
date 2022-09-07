import {ResponseError} from '../../types/common';

export const getErrorText = (field: HTMLInputElement, errorText: string) => {
  if (field.validity.patternMismatch && errorText) {
    return errorText;
  }
  return field.validationMessage;
};

export const isValid = (field: HTMLInputElement) => {
  return field.validity.valid;
};

export const hasResponseError = <T>(response: T | ResponseError): response is ResponseError => (
  response instanceof Object && response.reason !== undefined
);

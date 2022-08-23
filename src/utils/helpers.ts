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

export const queryStringify = (data: Record<string, string>): string => {
  if (typeof data !== 'object') {
    throw new Error('Not object');
  }
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
};

export const trim = (string: string, cuted = ''): string => {
  if (!cuted) {
    return string.trim();
  }
  return string.replace(new RegExp(`^[${cuted}]+|[${cuted}]+$`, "g"), '');
}

export const stringSanitize = (str: string) => {
  str.replace(/[&<>"']/gi, '')
}

import {TStringObject, TIndexedObject, ResponseError} from '../types/common';

// Data and http response validity checking
export const getErrorText = (field: HTMLInputElement, errorText: string) => {
  if (field.validity.patternMismatch && errorText) {
    return errorText;
  }
  return field.validationMessage;
};

export const isValid = (field: HTMLInputElement) => {
  return field.validity.valid;
};

export const hasResponseError = <T>(response: T | ResponseError ): response is ResponseError => (
  response instanceof Object && response.reason !== undefined
);
// ------------


// Format data helpers
export const formatFormData = (data: FormData) => {
  const result: TStringObject = {};
  for(const [name, value] of data) {
    if (typeof value === 'string') {
      result[name] = value;
    }
  }
  return result;
};

export const formatDate = (day: Date) => {
  const oneDay = 86400000;
  const week = oneDay * 7;
  const now = new Date();
  const format = (date: Date, options: Intl.DateTimeFormatOptions) => {
    const dtf = new Intl.DateTimeFormat('ru-RU', options);
    return dtf.format(date);
  };

  if (Number(now) - Number(day) < oneDay) {
    return format(day, { hour: 'numeric', minute: 'numeric' });
  } else if (Number(now) - Number(day) < week) {
    return format(day, { weekday: 'short' });
  } else {
    return format(day, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
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
// ------------


// String manipulation
export const trim = (string: string, cuted = ''): string => {
  if (!cuted) {
    return string.trim();
  }
  return string.replace(new RegExp(`^[${cuted}]+|[${cuted}]+$`, "g"), '');
}

export const stringSanitize = (str: string) => {
  str.replace(/[&<>"']/gi, '')
}
// ------------


// Objects and arrays manipulation
export const isObject = (object: TIndexedObject | unknown):object is TIndexedObject => {
  return typeof object === 'object' && object !== null
}

export const isEqual = (lhs: object, rhs: object): boolean => {
  if (lhs === rhs) {
    return true;
  }

  if (!isObject(lhs) || !isObject(rhs)) {
    return false;
  }

  const keysA = Reflect.ownKeys(lhs);
  const keysB = Reflect.ownKeys(rhs);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    if (
      !Reflect.has(rhs, keysA[i]) ||
      !isEqual(lhs[keysA[i] as string], rhs[keysA[i] as string])
    ) {
      return false;
    }
  }

  return true;
}

export function merge(lhs: TIndexedObject, rhs: TIndexedObject): TIndexedObject {
  for (const p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      continue;
    }
    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as TIndexedObject, rhs[p] as TIndexedObject);
      } else {
        lhs[p] = rhs[p];
      }
    } catch(e) {
      lhs[p] = rhs[p];
    }

  }
  return lhs;
}

export function set(object: TIndexedObject | unknown, path: string, value: unknown): TIndexedObject | unknown {
  if (!isObject(object)) {
    return object;
  }

  const arr = path.split('.');
  const newObject = arr.reduceRight((acc: TIndexedObject, key: string, index: number): TIndexedObject => {
    if (index === arr.length - 1) {
      acc[key] = value as TIndexedObject;
      return acc;
    }
    return {
      [key]: acc
    } as TIndexedObject;
  }, {})

  return merge(object, newObject);
}
// ------------


// DOM elements handlers
export function openModal(id: string) {
  const modal = document.getElementById(id);
  const modalClose = modal?.querySelector('.modal__close');
  const modalOverlay = modal?.querySelector('.modal__overlay');
  const closeModal = function () {
    modal?.classList.remove('open');
    modalClose?.removeEventListener('click', closeModal);
    modalOverlay?.removeEventListener('click', closeModal);
  };
  
  modal?.classList.add('open');
  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', closeModal);
}


export function closeModal(id: string) {
  const modal = document.getElementById(id);
  const modalClose = modal?.querySelector('.modal__close');
  const modalOverlay = modal?.querySelector('.modal__overlay');
  const closeModal = function () {
    modal?.classList.remove('open');
    modalClose?.removeEventListener('click', closeModal);
    modalOverlay?.removeEventListener('click', closeModal);
  };

  modal?.classList.remove('open');
  modalClose?.removeEventListener('click', closeModal);
  modalOverlay?.removeEventListener('click', closeModal);
}
// ------------

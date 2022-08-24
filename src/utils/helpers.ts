import {TStringObject, TIndexedObject} from '../types/common';

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

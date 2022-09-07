import {TStringObject} from '../../types/common';
import {stringSanitize, trim} from './string-helpers';

export const formatFormData = (data: FormData) => {
  const result: TStringObject = {};
  for (const [name, value] of data) {
    if (typeof value === 'string') {
      result[name] = stringSanitize(trim(value)) as unknown as string;
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
    return format(day, {hour: 'numeric', minute: 'numeric'});
  } else if (Number(now) - Number(day) < week) {
    return format(day, {weekday: 'short'});
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

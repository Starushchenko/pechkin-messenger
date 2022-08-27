import {TValidationRules, TStringObject} from '../types/common';

// API
export const METHODS: TStringObject = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};
export const API_URL = 'https://ya-praktikum.tech/api/v2';
export const WEBSOCKET_CHATS_URL = 'wss://ya-praktikum.tech/ws/chats/';

// Routing
export const ROUTES: TStringObject = {
  HOME: '/',
  AUTH: '/auth',
  REGISTER: '/register',
  CHATS: '/chats',
  CHAT: '/chat',
  PROFILE: '/profile',
  CHANGE_SETTINGS: '/change-settings',
  CHANGE_PASSWORD: '/change-password',
  ERROR_500: '/error_500',
  ERROR_404: '/error_404',
  LINKS: '/links'
}

export const ROUTER_EVENTS: TStringObject = {
  CHANGED: 'changed'
}

// Validation
export const VALIDATION_RULES: TValidationRules = {
  NAME: {
    rule: '^[A-ZА-ЯЁ][A-ZА-ЯЁa-zа-яё-]+$',
    errorText: 'Английские и русские буквы с заглавной без пробелов'
  },
  LOGIN: {
    rule: '(?=.*[A-Za-z])[A-Za-z0-9\\-_]+',
    errorText: 'Только английские буквы и цифры без пробелов'
  },
  EMAIL: {
    rule: '^[\\w.-]+@[\\w.-]+[A-Za-z0-9]+\\.[A-Za-z]{2,4}$',
    errorText: 'Email введён с ошибкой'
  },
  PASSWORD: {
    rule: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$',
    errorText: 'От 8 до 40 символов, обязательно одна заглавная буква и цифра'
  },
  PHONE: {
    rule: '([\\+]*[7-8]{1}\\s?[\\(]*9[0-9]{2}[\\)]*\\s?\\d{3}[-]*\\d{2}[-]*\\d{2})',
    errorText: 'Телефон введён с ошибкой'
  },
  MESSAGE: {
    rule: '.+',
    errorText: 'Поле не должно быть пустым'
  }
}

// Store
export const STORE_EVENTS: TStringObject = {
  UPDATED: 'updated'
}

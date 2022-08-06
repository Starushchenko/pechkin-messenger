export const NAME = {
  rule: '^[A-ZА-ЯЁ][A-ZА-ЯЁa-zа-яё-]+$',
  errorText: 'Английские и русские буквы с заглавной без пробелов'
};
export const LOGIN = {
  rule: '(?=.*[A-Za-z])[A-Za-z0-9\\-_]+',
  errorText: 'Только английские буквы и цифры без пробелов'
};
export const EMAIL = {
  rule: '^[\\w.-]+@[\\w.-]+[A-Za-z0-9]+\\.[A-Za-z]{2,4}$',
  errorText: 'Email введён с ошибкой'
};
export const PASSWORD = {
  rule: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$',
  errorText: 'От 8 до 40 символов, обязательно одна заглавная буква и цифра'
};
export const PHONE = {
  rule: '([\\+]*[7-8]{1}\\s?[\\(]*9[0-9]{2}[\\)]*\\s?\\d{3}[-]*\\d{2}[-]*\\d{2})',
  errorText: 'Телефон введён с ошибкой'
};
export const MESSAGE = {
  rule: '\\S+',
  errorText: 'Поле не должно быть пустым'
};

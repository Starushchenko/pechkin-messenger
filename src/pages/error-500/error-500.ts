import Block from '../../utils/block';

import ErrorScreen from '../../components/error-screen/error-screen';

import template from './error-500.tpl.hbs';

export default class Page500 extends Block {
  protected initChildren() {
    this.children['error-screen'] = new ErrorScreen({
      isClient: false,
      code: 500,
      description: 'Ошибка на сервере, уже исправляем'
    });
  }

  render() {
    return this.compile(template, {});
  }
}

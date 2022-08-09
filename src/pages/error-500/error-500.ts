import Block from '../../utils/Block';
import renderDOM from '../../utils/renderDOM';

import ErrorScreen from '../../components/error-screen/error-screen';

import template from './error-500.tpl.hbs';

class Page404 extends Block {
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

document.addEventListener('DOMContentLoaded', () => {
  const page = new Page404();

  renderDOM('#app', page);
});

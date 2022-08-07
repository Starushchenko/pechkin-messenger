import Block from '../../utils/Block';
import renderDOM from '../../utils/renderDOM';

import ErrorScreen from '../../components/error-screen/error-screen';

import template from './error-404.tpl.hbs';

class Page404 extends Block {
  protected initChildren() {
    this.children['error-screen'] = new ErrorScreen({
      isClient: true,
      code: 404,
      description: 'Страница не найдена'
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

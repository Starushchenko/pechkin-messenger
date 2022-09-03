import Block from '../../utils/block/block';

import ErrorScreen from '../../components/error-screen/error-screen';

import template from './error-404.tpl.hbs';

export default class Page404 extends Block {
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

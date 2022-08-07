import Block from '../../utils/Block';
import renderDOM from '../../utils/renderDOM';

import Image from '../../images/welcome.png';
import Welcome from '../../components/welcome/welcome';

import template from './index.tpl.hbs';

class IndexPage extends Block {
  protected initChildren() {
    this.children.welcome = new Welcome({
      title: 'Pechkin Messenger',
      desc: 'место, где нет преград общению',
      image: Image
    });
  }

  render() {
    return this.compile(template, {});
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const page = new IndexPage();

  renderDOM('#app', page);
});

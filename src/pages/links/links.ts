import Block from '../../utils/block/block';

import Image from '../../../assets/images/welcome.png';
import Welcome from '../../components/welcome/welcome';

import template from './links.tpl.hbs';

export default class LinksPage extends Block {
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

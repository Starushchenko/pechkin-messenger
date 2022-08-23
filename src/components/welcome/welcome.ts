import Block from '../../utils/block';
import IWelcome from './interface';

import template from './welcome.tpl.hbs';


class Welcome extends Block {
  constructor(props: IWelcome) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Welcome;

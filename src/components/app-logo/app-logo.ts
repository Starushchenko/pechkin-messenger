import Block from '../../utils/block/block';
import IAppLogo from './interface';

import template from './app-logo.tpl.hbs';

class AppLogo extends Block {
  constructor(props: IAppLogo) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props});
  }
}

export default AppLogo;

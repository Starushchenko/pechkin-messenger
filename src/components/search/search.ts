import Block from '../../utils/Block';
import ISearch from './interface';

import template from './search.tpl.hbs';

class Search extends Block {
  constructor(props: ISearch) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props});
  }
}

export default Search;

import Block from '../../utils/block';
import IProfile from './interface';

import template from './profile.tpl.hbs';

class Profile extends Block {
  constructor(props: IProfile) { 
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export default Profile;

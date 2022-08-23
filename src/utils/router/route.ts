import Block from '../block';
import renderDom from '../render-dom';
// import { updatePageTitle } from 'src/utils/updatePageTitle/updatePageTitle';

export default class Route {
  constructor(pathname: string, view: typeof Block, props: any) {
    this.pathname = pathname;
    this.blockClass = view;
    this.block = null;
    this.props = props;
  }
  
  private pathname: string;
  private readonly blockClass: typeof Block;
  private block: Block | null;
  private props: any;

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this.block) {
      this.block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this.pathname;
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass();
    }

    // if (this.props.title) updatePageTitle(this.props.title);

    renderDom(this.props.rootQuery, this.block);
  }
}

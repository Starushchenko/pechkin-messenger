import Block from '../block/block';
import renderDom from '../render-dom/render-dom';

export default class Route {
  constructor(pathname: string, view: typeof Block, props: any) {
    this.pathname = pathname;
    this.blockClass = view;
    this.block = null;
    this.props = props;
  }
  
  private readonly pathname: string;
  private readonly blockClass: typeof Block;
  private block: Block | null;
  private props: any;

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

    renderDom(this.props.rootQuery, this.block);
  }
}

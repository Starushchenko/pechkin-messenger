import { describe } from 'mocha';
import { expect } from 'chai';
import Block from '../block/block';
import renderDom from './render-dom';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom')

let block: Block;

describe('Тестирование RenderDOM', () => {
  jsdom({
    url: 'http://localhost' 
  });
  const template = () => {
    return `<div>Block</div>`
  };

  class TestBlock extends Block {
    constructor() {
      super();
      this.props = {
        title: 'title',
      };
    }

    render() {
      return this.compile(template, {});
    }
  }

  before(() => {
    block = new TestBlock();
  });

  it('Отрисовка блока функцией renderDom успешна', () => {
    renderDom('body', block);
    const result = document.querySelector('body') as HTMLBodyElement;
    expect(result.textContent).to.be.equal('Block');
  });
});

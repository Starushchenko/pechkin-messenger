import { describe } from 'mocha';
import { expect } from 'chai';
import Block from './block';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom')

let block: Block;

describe('Тестирование Block', () => {
  jsdom({ url: 'http://localhost' });
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
      return this.compile(template, {
        ...this.props
      });
    }
  }

  before(() => {
    block = new TestBlock();
  });

  it('Блок имеет id', () => {
    expect(block.id).to.be.a('string');
  });

  it('Получение props через getProps() корректно', () => {
    expect(block.getProps()).to.have.property('title');
  });

  it('Установка props через setProps() корректна', () => {
    block.setProps({ text: 'text' });
    expect(block.getProps()).to.have.property('title');
    expect(block.getProps()).to.have.property('text');
  });

  it('Получение children блока не возвращает null', () => {
    expect(block.getChildren()).to.be.not.null;
  });

  it('Получение контента блока не возвращает null', () => {
    expect(block.getContent()).to.be.not.null;
  });

  it('Получение элемента блока не возвращает null', () => {
    expect(block.element).to.be.not.null;
  });
});

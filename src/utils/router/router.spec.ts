import { describe } from 'mocha';
import { expect } from 'chai';
import Block from '../block/block';
import {Router} from './router';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom')

describe('Тестирование Router', () => {
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
      return this.compile(template, {
        ...this.props
      });
    }
  }

  beforeEach(() => {
    const router = new Router();
    router
      .use("/dummy", TestBlock)
      .start();

    window.history.pushState({ name: "Test" }, "test", "http://localhost/test");
  });

  it("Router - это синглтон",() => {
    const router = new Router();
    expect(new Router()).to.eq(router);
  });

  it("Метод use работает корректно", () => {
    const router = new Router();
    const result = router.use("/", TestBlock);
    expect(result).to.eq(router);
  });

  it("Метод back отправляет назад по истории", done => {
    const expectedResult = "http://localhost/test";
    new Router().back();
    window.onpopstate = () => {
      expect(window.location.href).be.eq(expectedResult);
      done();
    };
  });

  it("Метод go отправляет на нужный url", () => {
    const expectedResult = "/test";
    new Router().go(expectedResult);

    expect(window.location.href).be.eq(`http://localhost${expectedResult}`);
  });
});

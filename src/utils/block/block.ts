import EventBus from '../event-bus';
import {nanoid} from 'nanoid';
import {isEqual} from '../helpers/object-helpers';
import store from '../store/store';
import {STORE_EVENTS} from '../../constants/constants';

class Block {
  /** JSDoc
   * @param {Object} args
   *
   * @returns {void}
   */
  private _element: HTMLElement | null = null;
  private eventBus: () => EventBus;
  protected props: any;
  protected children: Record<string, Block>;
  public id = nanoid(10);
  
  constructor(args: any = {}) {
    const eventBus = new EventBus();
    const { props, children } = this.separateChildren(args);

    this.children = children;
    this.props = this._makePropsProxy(props);
    this.initChildren();
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }
  
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    FLOW_READY: "flow:ready"
  };

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_READY, this._componentReady.bind(this));
  }

  private _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentReady() {
    this.componentReady();
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  private _render() {
    const fragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();

    this.eventBus().emit(Block.EVENTS.FLOW_READY);
    store.on(STORE_EVENTS.UPDATED, this._storeUpdated.bind(this));
  }

  private _makePropsProxy(props: any) {
    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      
      set: (target: Record<string, unknown>, prop: string, value: unknown) => {
        const oldProps = { ...target };
        target[prop] = value;

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) return;

    Object.entries(events).forEach(([event, listener]) => {
      this._element?.addEventListener(event, listener);
    });
  }

  private _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) return;

    Object.entries(events).forEach(([event, listener]) => {
      this._element?.removeEventListener(event, listener);
    });
  }

  private static _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }
  
  protected componentDidMount() {
    return;
  }

  protected componentDidUpdate(oldProps: any, newProps: any) {
    if (!isEqual(oldProps, newProps)) {
      return true;
    } 

    return;
  }

  protected _storeUpdated() {
    this.onStoreUpdate();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  protected separateChildren(args: any) {
    const children: any = {};
    const props: any = {};

    Object.entries(args).map(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  protected initChildren() {
    return;
  }

  protected compile(template: (context: any) => string, context: any) {
    const fragment = Block._createDocumentElement('template') as HTMLTemplateElement;

    Object.entries(this.children).forEach(([key, child]) => {
      context[key] = `<div data-id="id-${child.id}"></div>`;
    });

    fragment.innerHTML = template(context);

    Object.entries(this.children).forEach(([, child]) => {
      const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);
      if (!stub) {
        return;
      }
      stub.replaceWith(child.getContent() as HTMLElement);
    });

    return fragment.content;
  }
  
  protected componentReady() {
    return;
  }

  protected onStoreUpdate() {
    return;
  }

  public setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  public get element(): HTMLElement | null {
    return this._element;
  }

  public getContent(): HTMLElement | null {
    return this.element;
  }

  public getProps = (): Record<string, any> => {
    return this.props;
  };

  public getChildren(): Record<string, Block> {
    return this.children;
  }

  public init() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }
}

export default Block;

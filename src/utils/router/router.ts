import Block from '../block';
import Route from './route';
import EventBus from '../event-bus';

export class Router extends EventBus {
  constructor(rootQuery?: string, pageNotFound?: string) {
    super();
    
    if (Router.__instance) {
      return Router.__instance;
    }

    this._rootQuery = rootQuery || ''
    if (pageNotFound)  {
      this._pageNotFound = pageNotFound;
    }

    Router.__instance = this;
  }
  
  private static __instance: Router;
  private routes: Route[] = [];
  private history = window.history;
  private readonly _rootQuery: string
  private readonly _pageNotFound: string | null = null;

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      if (this._pageNotFound)  {
        this.go(this._pageNotFound);
      }
      return;
    }
    
    route.render();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  public use(pathname: string, block: typeof Block, props?: any) {
    const route = new Route(pathname, block, { ...props, rootQuery: this._rootQuery });
    this.routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  public go(pathname: string) {
    if (window.location.pathname !== pathname) {
      this.history.pushState({}, '', pathname);
      this._onRoute(pathname);
    }
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }
}

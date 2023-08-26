import Block from "./block";
import { renderDOM } from "./render-dom";

class Route {
  private _pathname: string;

  private readonly _blockClass: Block;

  private _block: Block | null;

  private _props: Record<string, string>;

  constructor(pathname: string, view: Block, props: Record<string, string>) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    this._block = this._blockClass;
    renderDOM(this._props.rootQuery, this._block);
  }
}

export default Route;

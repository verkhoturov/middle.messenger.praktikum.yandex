import { nanoid } from "nanoid";
import EventBus from "./eventbus";

export interface BlockDefaultProps {
  className?: string;
  [key: string]: unknown;
}

export default class Block<T extends BlockDefaultProps = {}> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  _element: HTMLElement;

  _meta: Record<string, unknown> = {};

  props: T;

  _id = "";

  eventBus: () => EventBus;

  constructor(tagName = "div", props: T) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props
    };

    this._id = nanoid(6);

    this.props = this._makePropsProxy({ ...props, __id: this._id });

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createDocumentElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K
  ): HTMLElement {
    return document.createElement(tagName);
  }

  _createResources() {
    const { tagName } = this._meta as { tagName: keyof HTMLElementTagNameMap };
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount(props: T) {
    this.componentDidMount(props);
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount(_props: T) {
    return;
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: T, newProps: T) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(_oldProps: T, _newProps: T) {
    return true;
  }

  setProps = (nextProps: Partial<T>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement {
    return this._element;
  }

  _render() {
    const fragment = this.render();
    const element = fragment.firstElementChild;

    if (!element) {
      return;
    }

    this._removeEvents();
    this._element.replaceWith(element);
    this._element = element as HTMLElement;

    this._addEvents();
  }

  // Может переопределять пользователь, необязательно трогать
  render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent(): HTMLElement {
    return this.element;
  }

  getId(): string {
    return this._id;
  }

  _removeEvents() {
    const { events = {} }: any = this.props;

    if (!events || !this._element) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  _addEvents() {
    const { events = {} }: any = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _makePropsProxy(props: T) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        if (target[prop] !== value || typeof value === "object") {
          target[prop as keyof T] = value;

          self.eventBus().emit(Block.EVENTS.FLOW_CDU);
        }
        return true;
      },
      deleteProperty(_target, _prop) {
        throw new Error("нет доступа");
      }
    });
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}

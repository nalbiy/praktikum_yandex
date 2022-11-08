import { v4 as makeUUID } from 'uuid';
import { Props, Children } from 'src/type_component';
import { EventBus } from './EventBus';

export class Component {
  eventBus: EventBus;

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  readonly props: Props;

  private _element: HTMLElement | null = null;

  readonly _meta: { tagName: string; props: Props; classofTag: string } | null =
    null;

  readonly _id: string | null = null;

  template: string | null;

  addEvents: null;

  removeEvents: null;

  private children: Children;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} myprops
   *@param {string} classofTag
   * @param {string} template
   * @param {Function|null} MyaddEvents
   * @returns {void}
   */
  constructor(
    tagName = 'div',
    myprops: Children = {},
    classofTag = '',
    template: string | null = null,
    MyaddEvents = null,
    myRemoveEvents = null
  ) {
    // console.log('tagname',tagName)
    // console.log("classofTag", classofTag)

    const { children, props } = this._getChildren(myprops);
    // console.log("props", props)
    this.children = children;
    this.template = template;
    this.addEvents = MyaddEvents;
    this.removeEvents = myRemoveEvents;
    // это переменная только для конструктора
    const eventBus = new EventBus();
    // console.log(Component.EVENTS)
    // объект meta
    this._meta = {
      tagName,
      props,
      classofTag,
    };
    // Генерируем уникальный UUID V4
    this._id = makeUUID();
    // оборачиваем в proxy и возвращает другие но теже пропсы
    this.props = this._makePropsProxy({ ...props, __id: this._id });
    // console.log('this.props',this.props)
    // задействуем eventbus - ф-ция которая возвращает eventbus, чтобы использовать за конструктором
    this.eventBus = eventBus;
    // регистрируем событияb
    this._registerEvents(eventBus);
    // запускаем события переданные в eventbus
    eventBus.emit(Component.EVENTS.INIT);
  }

  _getChildren(myprops: Children) {
    // console.log('getmyprops',myprops)
    const children: Children = {};
    const props: Props = {};
    Object.entries(myprops).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _makePropsProxy(props: Props) {
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        target[prop] = value;
        this.eventBus.emit(Component.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _registerEvents(eventBus: EventBus) {
    // регистрируем событие
    // событие инициализации - создание элемента без пропсов
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));

    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));

    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));

    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  init() {
    this._createResources();
  }

  _createResources() {
    // тоже самое что  tagName=this._meta.tagName
    const { tagName, classofTag } = this._meta;
    // присваиваем _element созданный элемент
    this._element = this._createDocumentElement(tagName);
    this._element.className = classofTag;

    // console.log('create element', this._element)
    this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
  }

  _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    if (this._id != null) {
      element.setAttribute('data-id', this._id);
    }
    return element;
  }

  _componentDidMount() {
    // console.log("dispatch2")
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() {}

  dispatchComponentDidMount() {
    // console.log("dispatch1")

    this.eventBus.emit(Component.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate() {
    const response = this.componentDidUpdate();
    if (response) {
      this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate() {
    return true;
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
    // console.log('this.props', this.props)
    this.eventBus.emit(Component.EVENTS.FLOW_CDU);
  };

  get element() {
    if (this._element !== null) {
      return this._element;
    }
  }

  // удалить все обработчики событий (любого типа), вы можете клонировать элемент и заменить его на клон:
  clone() {
    this._element = this._element.cloneNode(true);
  }

  _render(): void {
    // console.log('render')
    const block = this.render();
    // this.RemoveEvents()
    // удалить все обработчики событий (любого типа), вы можете клонировать элемент и заменить его на клон:
    this.clone();

    this._element.innerHTML = ''; // удаляем предыдущее содержимое
    // console.log('elem',typeof this._element)
    this._element.appendChild(block);
    this.AddEvents();
    // this._element.innerHTML = block;
  }

  // Может переопределять пользователь, необязательно трогать
  render() {}

  // Может переопределять пользователь, необязательно трогать
  AddEvents() {
    if (this.addEvents) {
      this.addEvents(this.getContent(), this.props);
    }
  }

  // чтобы удалить события нужно конкретно знать какие события и какой евент - переопределяет пользователь
  RemoveEvents() {}

  getContent() {
    return this.element;
  }

  compile(template: string, props: Props) {
    // копируем пропсы
    const propsAndStubs = { ...props };
    // добавляем в пропсы чилдов со значениями заглушки
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}">заглушка</div>`;
    });
    // console.log('propsAndStubs', propsAndStubs)
    // создаем элемент с тегом template
    const fragment = this._createDocumentElement('template');
    // вставляем в созданный элемент шаблон с заглушками
    fragment.innerHTML = template(propsAndStubs);
    // console.log('fragment', fragment)
    // console.log('children', this.children)
    Object.values(this.children).forEach((child) => {
      //  console.log('child.id', child._id)
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`); // [property="value"]
      //  console.log('stub', stub)
      stub.replaceWith(child.getContent());
    });
    // console.log('fragment', typeof fragment)
    return fragment.content;
  }

  show() {
    // console.log('show')
    // eslint-disable-next-line no-underscore-dangle
    if (this.getContent() !== undefined) {
      this.getContent().style.display = 'block';
    }
  }

  hide() {
    // console.log('hide')
    // @ts-ignore
    this.getContent().style.display = 'none';
    // this._element.setAttribute("display", "none");
  }
}

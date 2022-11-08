import { Children } from 'src/type_component';
import { Component } from './Component';

export class AppComponent extends Component {
  constructor(
    tag: string,
    myprops: Children,
    classofTag: string,
    template: string,
    MyaddEvents = null,
    myRemoveEvents = null
  ) {
    // передаю в родительский класс пропсы и тег
    super(tag, myprops, classofTag, template, MyaddEvents);
  }

  RemoveEvents() {
    if (this.removeEvents) {
      this.removeEvents(this.getContent());
    }
  }

  render() {
    if (this.template !== null) {
      return this.compile(this.template, this.props);
    }
  }
}

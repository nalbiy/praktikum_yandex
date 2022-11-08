import { Props } from 'src/type_component';
import { AppComponent } from 'src/modules/AppComponent';
import ButtonTpl from './Button.hbs';

export default function button(ButtonLoginProps: Props) {
  return new AppComponent('div', ButtonLoginProps, 'form-example', ButtonTpl);
}

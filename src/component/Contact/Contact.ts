import { Props } from 'src/type_component';
import ContactTpl from './Contact.hbs';
import { AppComponent } from '../../modules/AppComponent';

export default function contact(props: Props) {
  return new AppComponent('div', props, 'form-example', ContactTpl);
};


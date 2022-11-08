import { Props } from 'src/type_component';
import { AppComponent } from 'src/modules/AppComponent';
import { validEl } from 'src/utility/valid';
import InputTpl from './Input.hbs';

function InputEvents(el: HTMLDivElement) {
  const errordiv = el.querySelector('#errormessage');
  if (errordiv) {
    const inputs = el.querySelectorAll('input');
    if (inputs) {
      inputs.forEach((item) => {
        item.addEventListener('blur', () => {
          validEl(item, errordiv);
        });
      });
    }
  }
}

function removeInputEvents(el: HTMLDivElement) {
  const inputs = el.querySelectorAll('input');
  const errordiv = el.querySelector('#errormessage');
  if (inputs) {
    inputs.forEach((item) => {
      item.removeEventListener('blur', () => {
        validEl(item, errordiv);
      });
    });
  }
}

export default function input(props: Props) {
  return new AppComponent(
    'div',
    props,
    'form-example',
    InputTpl,
    InputEvents,
    removeInputEvents
  );
}

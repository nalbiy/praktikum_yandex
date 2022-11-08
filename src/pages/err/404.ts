import tpl from './404.hbs';

export default function ():void {
  const context: object = { title: 'Внимание ошибка: ' };
  const root = document.getElementById('main');
  if (root !== null) {
    root.innerHTML = tpl(context);
  }
  // document.getElementById('main').innerHTML = tpl(context)
}

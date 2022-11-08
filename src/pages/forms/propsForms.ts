export const inputs = {
  first_name: {
    inputname: 'first_name', text: 'Имя', type: 'text', events: { click: () => { console.log('first_name') } },
  },
  second_name: {
    inputname: 'second_name', text: 'Фамилия', type: 'text', events: { click: () => { console.log('first_name') } },
  },
  display_name: {
    inputname: 'display_name', text: 'Отображаемое имя', type: 'text', events: { click: () => { console.log('first_name') } },
  },
  login: {
    inputname: 'login', text: 'Логин', type: 'text', events: { click: () => { console.log('first_name') } },
  },
  email: {
    inputname: 'email', text: 'Email', type: 'email', events: { click: () => { console.log('first_name') } },
  },
  phone: {
    inputname: 'phone', text: 'Тел', type: 'text', events: { click: () => { console.log('first_name') } },
  },
  oldPassword: {
    inputname: 'oldPassword', text: 'oldPassword', type: 'password', events: { click: () => { console.log('oldpass') } },
  },
  newPassword: {
    inputname: 'newPassword', text: 'newPassword', type: 'password', events: { click: () => { console.log('newpass') } },
  },
  Password: {
    inputname: 'Password', text: 'пароль', type: 'password', events: { click: () => { console.log('first_name') } },
  },
  avatar: {
    inputname: 'avatar', text: 'Фото', type: 'file', events: { click: () => { console.log('first_name') } },
  },
}

import img from '../../../public/image/user.jpg';

export const propsChat:object = {
  chats: [
    {
      id: 0, user: 'IVAN', lastmessege: '1 какой-то текст', img, active: false, events: { click: () => { alert('click') } },
    },
    {
      id: 1, user: 'Petr', lastmessege: '2 какой-то текст', img, active: false, events: { click: () => { alert('click') } },
    },
    {
      id: 2, user: 'Sergey', lastmessege: '3 какой-то текст', img, active: false, events: { click: () => { alert('click') } },
    },
    {
      id: 3, user: 'vasya', lastmessege: '4 какой-то текст', img, active: false, events: { click: () => { alert('click') } },
    },
    {
      id: 4, user: 'Alex', lastmessege: '5 какой-то текст', img, active: false, events: { click: () => { alert('click') } },
    },
  ],
}
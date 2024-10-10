import { Dropdown } from 'bootstrap';

export default {
  menus: [
    {
      title: '지도',
      url: '/map',
    },
    {
      title: '버디즈',
      url: '/buddiz',
    },
    {
      title: '공지사항',
      url: '/board/list',
    },
    {
      title: '채팅',
      url: '/chat',
    },
  ],

  accoutMenus: {
    login: {
      url: '/auth/login',
      title: '로그인',
    },
  },
};

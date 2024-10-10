export default {
  menus: [
    {
      title: '공지사항',
      url: '/board/list',
    },
    {
      title: '버디즈',
      url: '/buddiz',
    },
    {
      title: '환율',
      url: '/exchange',
    },
    {
      title: '지도',
      url: '/map',
    },
    {
      title: '채팅',
      url: '/chat',
    },
  ],

  accoutMenus: {
    login: {
      url: '/auth/login',
      title: 'Login',
    },

    join: {
      url: '/auth/join',
      title: '마이페이지',
      icon: 'fa-solid fa-user-plus',
    },
  },
};

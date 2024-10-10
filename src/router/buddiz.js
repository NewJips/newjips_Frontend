export default [
    {
      path: '/buddiz',
      name: 'BuddizSearch',
      component: () => import('../pages/buddiz/BuddizSearchPage.vue'),
    },
    {
      path: '/buddiz/userDetail/:uno',
      name: 'buddizDetail',
      component:()=>import('../pages/buddiz/BuddizDetailPage.vue')
    },
  ];
  
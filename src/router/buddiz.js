export default [
    {
      path: '/buddiz',
      name: 'BuddizSearch',
      component: () => import('../pages/buddiz/buddizSearchPage.vue'),
    },
    {
      path: '/buddiz/userDetail/:uno',
      name: 'buddizDetail',
      component:()=>import('../pages/buddiz/buddizDetailPage.vue')
    },
  ];
  
export default [
  {
    path: '/mypage/mystatus',
    name: 'mystatus',
    component: () => import('../pages/mypage/MyStatusPage.vue'),
  },
  {

    path: '/mypage/blame',
    name: 'myblame',
    component: () => import('../pages/mypage/MyBlamePage.vue')
  },
  {
    path: '/mypage/myedit',
    name: 'myedit',
    component: () => import('../pages/mypage/MyEditPage.vue'),
  },
  {
    path: '/mypage/wish',
    name: 'mywish',
    component: () => import('../pages/mypage/MyWishPage.vue'),
  },
  {
    path: '/mypage/buddizform',
    name: 'buddizform',
    component: () => import('../pages/buddiz/buddizForm.vue'), // Correct path to the BuddizForm.vue
  }
];

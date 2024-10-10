export default [
  {
    path: '/estate/:eno',
    name: 'estate',
    component: () => import('../pages/estate/EstateDetailPage.vue'),
    props: true,
  },
];

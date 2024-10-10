export default [
    {
      path: '/blame/agent',
      name: 'blame/agent',
      component: () => import('../pages/blame/BlameAgent.vue'),
    },    
    {
        path: '/blame/buddiz',
        name: 'blame/buddiz',
        component: () => import('../pages/blame/BlameBuddiz.vue'),
      },
      {
        path: '/blame/success',
        name: 'blame/success',
        component: () => import('../pages/blame/BlameSuccess.vue'),
      },
  ];
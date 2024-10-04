import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import authRoutes from './auth';
import boardRoutes from './board';
import mapRoutes from './map';
import chatRoutes from './chat';
import blameRoutes from './blame';
import guideRoutes from './guide';
import Blp from '@/pages/board/BoardListPage.vue';
import Bdp from '@/pages/board/BoardDetailPage.vue';
import buddizRoutes from './buddiz';
import mypageRoutes from './mypage';
import JoinPage from '@/pages/auth/JoinPage.vue';
import loanRoutes from './loan';
import formRoutes from './buddizForm';
import aiChatPage from '@/pages/ai/AiChatPage.vue';
import estateRoutes from './estate';
import NotFoundRoutes from './404NotFound';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/auth/join',
      name: 'joinPage',
      component: JoinPage,
    },
    {
      path: '/board', // 공지 리스트 페이지
      name: 'Blp',
      component: Blp,
    },
    {
      path: '/board/:no', // 개별 공지 상세 페이지
      name: 'Bdp',
      component: Bdp,
      props: true, // URL 파라미터를 props로 전달
    },
    {
      path: '/ai',
      name: 'ai',
      component: aiChatPage,
    },
    ...authRoutes,
    ...boardRoutes,
    ...mapRoutes,
    ...chatRoutes,
    ...blameRoutes,
    ...guideRoutes,
    ...buddizRoutes,
    ...mypageRoutes,
    ...loanRoutes,
    ...formRoutes,
    ...estateRoutes,
    ...NotFoundRoutes,
  ],
});

export default router;

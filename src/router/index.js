// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';  // Import HomePage component
import LoanProductPage from '../pages/Loan/LoanProductPage.vue';  // Import LoanProductPage component
import JoinPage from '@/pages/auth/JoinPage.vue';  // Import JoinPage component
import authRoutes from './auth';  // Import auth-related routes
import boardRoutes from './board';  // Import board-related routes
import mapRoutes from './map';  // Import map-related routes
import chatRoutes from './chat';  // Import chat-related routes
import blameRoutes from './blame';  // Import blame-related routes
import guideRoutes from './guide';  // Import guide-related routes
import buddizRoutes from './buddiz';  // Import Buddiz-related routes
import mypageRoutes from './mypage';  // Import MyPage-related routes
import loanRoutes from './loan';  // Import Loan-related routes
import formRoutes from './buddizForm';  // Import BuddizForm-related routes
import aiChatPage from '@/pages/ai/AiChatPage.vue';  // Import AiChatPage component
import estateRoutes from './estate';  // Import Estate-related routes
import NotFoundRoutes from './404NotFound';  // Import 404 NotFound routes

// Create the router instance with history mode and routes
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Use HTML5 history mode
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,  // HomePage route
    },
    
    {
      path: '/auth/join',
      name: 'joinPage',
      component: JoinPage,  // JoinPage route
    },
    {
      path: '/loanproduct/:loanId',  // Dynamic route for loan product page
      name: 'loan-product',
      component: LoanProductPage,
      props: true,  // Pass loanId as a prop to the LoanProductPage component
    },
    {
      path: '/board',  // Board List Page
      name: 'Blp',
      component: () => import('../pages/board/BoardListPage.vue'),
    },
    {
      path: '/board/:no',  // Board Detail Page with dynamic "no" param
      name: 'Bdp',
      component: () => import('../pages/board/BoardDetailPage.vue'),
      props: true,  // Pass URL params as props to the BoardDetailPage component
    },
    {
      path: '/ai',
      name: 'ai',
      component: aiChatPage,  // AI Chat Page
    },
    // Spread operator to include additional routes defined in other modules
    ...authRoutes,  // Include authentication-related routes
    ...boardRoutes,  // Include board-related routes
    ...mapRoutes,  // Include map-related routes
    ...chatRoutes,  // Include chat-related routes
    ...blameRoutes,  // Include blame-related routes
    ...guideRoutes,  // Include guide-related routes
    ...buddizRoutes,  // Include Buddiz-related routes
    ...mypageRoutes,  // Include MyPage-related routes
    ...loanRoutes,  // Include loan-related routes
    ...formRoutes,  // Include BuddizForm-related routes
    ...estateRoutes,  // Include estate-related routes
    ...NotFoundRoutes,  // Include 404 NotFound page for undefined routes
  ],
});

export default router;

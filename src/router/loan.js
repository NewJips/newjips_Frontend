import LoanProductPage from '../pages/Loan/LoanProductPage.vue';
import LoanDetailPage from '../pages/Loan/LoanDetailPage.vue';
import i18n from "@/i18n";

const loanRoutes = [
  {
    path: '/loanproduct',
    name: 'loan-product',
    component: LoanProductPage,
  },
  {
    path: '/loandetail/:loanId', // Dynamic route for specific loan products
    name: 'loan-detail',
    component: LoanDetailPage,
    props: true, // Pass loanId as prop
  },
  
];

export default loanRoutes;

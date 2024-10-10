// loanApi.js
import api from '@/api';  // Axios instance

const BASE_URL = '/api/loan';

export default {
  // Fetch the loan list
  async fetchLoanList() {
    const { data } = await api.get(`${BASE_URL}/list`);
    return data;
  },

  // Fetch loan details by loan ID
  async fetchLoanDetail(lno) {
    const { data } = await api.get(`${BASE_URL}/detail/${lno}`);
    return data;
  },
};

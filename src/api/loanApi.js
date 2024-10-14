// loanApi.js
import api from '@/api';  // Axios instance

const BASE_URL = '/api/loan';

export default {
  // Fetch the loan list
  async fetchLoanList(lan) {
    const { data } = await api.get(`${BASE_URL}/list`, { params: { lan } });
    return data;
  },

  // Fetch loan details by loan ID
  async fetchLoanDetail(lno, lan) {
    const { data } = await api.get(`${BASE_URL}/detail/${lno}`, { params: { lan } });
    return data;
  },

  // Fetch top 3 loans
  async fetchTopLoans(lan) {
    const { data } = await api.get(`${BASE_URL}/top3`, { params: { lan } });
    return data;
  },
};

// loanApi.js
import api from '@/api';  // Axios instance

const BASE_URL = '/api/loan';  // The base URL for loan-related API calls

export default {
  // Fetch the loan list based on language
  async fetchLoanList(lan) {
    try {
      const { data } = await api.get(`${BASE_URL}/list`, { params: { lan } });
      return data;
    } catch (error) {
      throw new Error('Error fetching loan list: ' + error);
    }
  },

  // Fetch loan details by loan ID and language
  async fetchLoanDetail(lno, lan) {
    try {
      const { data } = await api.get(`${BASE_URL}/detail/${lno}`, { params: { lan } });
      return data;
    } catch (error) {
      throw new Error('Error fetching loan detail: ' + error);
    }
  },

  // Fetch top 3 loans based on language
  async fetchTopLoans(lan) {
    try {
      const { data } = await api.get(`${BASE_URL}/top3`, { params: { lan } });
      return data;
    } catch (error) {
      throw new Error('Error fetching top 3 loans: ' + error);
    }
  },
};

import api from '@/api';
import i18n from '@/i18n';

const BASE_URL = '/api/estate';

// API 함수
const getEstateList = () => api.get(`${BASE_URL}/list`);
const getEstateDetail = (eno) => api.get(`${BASE_URL}/list/${eno}`);

export default {
  getEstateList,
  getEstateDetail,
};

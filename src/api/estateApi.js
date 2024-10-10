import api from '@/api';

const BASE_URL = '/api/estate';
const headers = { 'Content-Type': 'multipart/form-data' };

// 매물 리스트 조회 API
const getEstateList = () => {
  return api.get(`${BASE_URL}/list`);
};

export default {
  getEstateList,
};

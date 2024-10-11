import api from '@/api'; //axios 기반의 API 인스턴스를 가져옵니다.

const BASE_URL = '/api/wish';
const headers = { 'Content-Type': 'multipart/form-data' };
const headersjson = { 'Content-Type': 'application/json' };

export default {
  //찜 등록하기
  async insertblame(formData) {
    const { data } = await api.post(BASE_URL, formData, headersjson);
    return data;
  },

  //찜 정보 조회
  async getblame(wishid) {
    const { data } = await api.get(`${BASE_URL}/${wishid}`);
    console.log('GET wish', data);
    return data;
  },

  //버디즈 찜 목록 조회
  async getwishbuddiz(uno) {
    const { data } = await api.get(`${BASE_URL}/buddizz/${uno}`);
    console.log('GET BLAMEBUDIZ', data);
    return data;
  },

  //매물 찜 목록 조회
  async getwishestate(uno) {
    const { data } = await api.get(`${BASE_URL}/estate/${uno}`);
    console.log('GET BLAMEESTATE', data);
    return data;
  },
};

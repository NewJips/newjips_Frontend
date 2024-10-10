import api from '@/api'; //axios 기반의 API 인스턴스를 가져옵니다.

const BASE_URL = '/api/blame';
const headers = { 'Content-Type': 'multipart/form-data' };
const headersjson = { 'Content-Type': 'application/json' };

export default {
  //신고 하기
  async insertblame(formData) {
    const { data } = await api.post(BASE_URL, formData, headersjson);
    return data;
  },

  //신고 정보 조회
  async getblame(blaid) {
    const { data } = await api.get(`${BASE_URL}/${blaid}`);
    console.log('GET BLAME', data);
    return data;
  },

  //버디즈 신고 목록 조회
  async getblamebudiz(uno) {
    const { data } = await api.get(`${BASE_URL}/buddiz/${uno}`);
    console.log('GET BLAMEBUDIZ', data);
    return data;
  },

  //매물 신고 목록 조회
  async getblameestate(uno) {
    const { data } = await api.get(`${BASE_URL}/estate/${uno}`);
    console.log('GET BLAMEESTATE', data);
    return data;
  },


};

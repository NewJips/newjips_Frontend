import api from '@/api';

const BASE_URL = '/api/buddiz';

const headers = { 'Content-Type': 'multipart/form-data' };

export default{
  async getList(params) {
    const { data } = await api.get(BASE_URL, { params });
    console.log('BOARD GET LIST: ', data);
    return data;
  },

  async get(uno) {
    const { data } = await api.get(`${BASE_URL}/userDetail/${uno}`);
    console.log('BOARD GET', data);
    return data;
  },

  async getReview(uno){
    const { data } = await api.get(`${BASE_URL}/review/${uno}`);
    console.log('REVIEW GET', data);
    return data;
  }
  
  
}
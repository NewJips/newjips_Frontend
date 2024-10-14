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
  },
  async create(article, uno) {
    const formData = new FormData();
  
    // formData.append('writer', article.writer);
    formData.append('rating', article.rating);
    formData.append('reviewContent', article.reviewContent);
    console.log('api에서의 content',article.reviewContent);

    const { data } = await api.post(`${BASE_URL}/reviewAdd/${uno}`, formData, { headers });
    console.log('BOARD POST: ', data);
    return data;
  },
  async reviewWish(uno){
    const formData = new FormData();
    formData.append('uno',uno);
    console.log(uno);
    const{data}=await api.post(`${BASE_URL}/reviewWish/${uno}`, formData, { headers });
    return data;
  },
  
}
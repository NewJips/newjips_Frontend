import api from '@/api';  // Axios setup

const BASE_URL = 'http://localhost:8080/api/buddiz';

export default {
  // Fetch all Buddiz introductions from the backend
  async fetchAllIntros() {
    const { data } = await api.get(`${BASE_URL}/intro`);
    return data;
  },
  
  // Fetch a specific Buddiz intro by ID
  async fetchIntroById(uno) {
    const { data } = await api.get(`${BASE_URL}/intro/${uno}`);
    return data;
  },

  // Update an existing Buddiz introduction
  async updateBuddizIntro(buddizData) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(buddizData)) {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${key}[]`, item));
      } else {
        formData.append(key, value);
      }
    }
    const headers = { 'Content-Type': 'multipart/form-data' };
    const { data } = await api.put(`${BASE_URL}/intro/update`, formData, { headers });
    return data;
  },
};

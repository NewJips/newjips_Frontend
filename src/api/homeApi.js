import api from '@/api';

const BASE_URL = '/api';
const headers = { 'Content-Type': 'multipart/form-data' };

export default {
    ///////////////  인기 버디즈 조회 ////////////////////////
    async getPopBuddiz() {
        const { data } = await api.get(`${BASE_URL}/popular-buddies/`);
        console.log('AUTH GET', data);
        return data;
    },
};
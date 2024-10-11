import api from '@/api';

const BASE_URL = '/api';

export default {
    ///////////////  환율 정보 조회 ////////////////////////
    async getExchangeRate() {
        try {
            // API 엔드포인트로 GET 요청 보내기
            const { data } = await api.get(`${BASE_URL}/exchange-rate`);
            console.log('EXCHANGE RATE GET', data);

            // 응답 데이터 반환
            return data;
        } catch (error) {
            // 오류 발생 시 콘솔에 로그 출력
            console.error('Error fetching exchange rates:', error);
            throw error;
        }
    }
};

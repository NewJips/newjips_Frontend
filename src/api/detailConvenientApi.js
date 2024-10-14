import axios from 'axios';

const BASE_URL = '/api/kakao';

const categories = [
  { code: 'CS2', query: '편의점' },
  { code: 'HP8', query: '병원' },
  { code: 'BK9', query: '은행' },
  { code: 'CE7', query: '카페' },
];

const detailConvenientApi = {
  getConvenientLocations: async (latitude, longitude) => {
    try {
      const categoryPromises = categories.map((category) =>
        axios.get(`${BASE_URL}/convenient`, {
          params: {
            x: longitude,
            y: latitude,
            query: category.query,
            category_group_code: category.code,
          },
        })
      );

      const responses = await Promise.all(categoryPromises);

      const results = {};
      responses.forEach((response, index) => {
        const category = categories[index];
        results[category.code] = response.data.documents.map((document) => ({
          x: document.x,
          y: document.y,
          place_name: document.place_name,
          distance: document.distance,
        }));
      });

      return results;
    } catch (error) {
      console.error('Error fetching convenient locations:', error);
      throw error;
    }
  },
};

export default detailConvenientApi;

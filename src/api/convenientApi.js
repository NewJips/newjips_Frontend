import axios from 'axios';

const BASE_URL = '/api/kakao';

const categories = [
  { code: 'CS2', query: '편의점' },
  { code: 'HP8', query: '병원' },
  { code: 'BK9', query: '은행' },
  { code: 'CE7', query: '카페' },
];

const locations = [
  { x: 127.074454848, y: 37.54785018 },
  { x: 127.0281517, y: 37.4980669 },
  { x: 127.0555885, y: 37.5446007 },
  { x: 126.925666, y: 37.557667 },
];

const convenientApi = {
  getConvenientLocations: async () => {
    try {
      const locationPromises = locations.map((location) =>
        Promise.all(
          categories.map((category) =>
            axios.get(`${BASE_URL}/convenient`, {
              params: {
                x: location.x,
                y: location.y,
                query: category.query,
                category_group_code: category.code,
              },
            })
          )
        )
      );

      const allResponses = await Promise.all(locationPromises);

      const results = allResponses.map((locationResponses, locationIndex) => {
        const categoryResults = {};
        locationResponses.forEach((response, categoryIndex) => {
          const category = categories[categoryIndex];
          categoryResults[category.code] = response.data.documents.map(
            (document) => ({
              x: document.x,
              y: document.y,
            })
          );
        });
        return {
          location: locations[locationIndex],
          categories: categoryResults,
        };
      });

      return results;
    } catch (error) {
      console.error('Error fetching convenient locations:', error);
      throw error;
    }
  },
};

export default convenientApi;

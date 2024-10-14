// buddizIntroApi.js
import api from "@/api"; // Or your correct API setup

const BASE_URL = "/api/buddiz/intro";

export default {
  // Fetch all Buddiz introductions
  async getAllBuddizIntro() {
    try {
      const { data } = await api.get(`${BASE_URL}`);
      return data;
    } catch (error) {
      console.error("Error fetching all Buddiz intros:", error);
      throw error;
    }
  },

  // Fetch Buddiz intro by user ID (uno)
  async getBuddizIntro(uno) {
    try {
      const { data } = await api.get(`${BASE_URL}/${uno}`);
      return data;
    } catch (error) {
      console.error("Error fetching Buddiz intro by uno:", error);
      throw error;
    }
  },

  // Save or update Buddiz intro
  async saveOrUpdateBuddizIntro(buddizIntro) {
    try {
      const response = await api.post(`${BASE_URL}/saveOrUpdate`, buddizIntro);
      return response.data;
    } catch (error) {
      console.error("Error saving or updating Buddiz intro:", error);
      throw error;
    }
  },
};

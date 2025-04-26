import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const userService = {
 
  getUsers: async (page = 1, search = "", limit = 5) => {
    try {
      const response = await apiClient.get("/users", {
        params: { page, search, limit },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  getUserById: async (id) => {
    try {
      const response = await apiClient.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  updateUser: async (id, userData) => {
    try {
      const response = await apiClient.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  deleteUser: async (id) => {
    try {
      const response = await apiClient.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  createUser: async (userData) => {
    try {
      const response = await apiClient.post("/users", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

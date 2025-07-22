// src/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getStockData = async (symbol) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stock/${symbol}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data", error);
    return null;
  }
};

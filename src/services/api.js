import axios from "axios";

const API_URL =
  "/api/api/v3/coins/markets?vs_currency=inr&per_page=10&page=";

export const fetchChartData = async (id) => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=7`
    );
    return res.data.prices;
  };

  export const fetchCrypto = async (page = 1) => {
    const res = await axios.get(`${API_URL}${page}`);
    return res.data;
  };


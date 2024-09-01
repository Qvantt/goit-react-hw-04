import axios from "axios";

const API_KEY = "-RbkWJn12oKJpmq5Cf7oj2I3shtCxyFuqFuBzpCqIBc";
const BASE_URL = "https://api.unsplash.com/";

export const searchImages = async (query, page = 1) => {
  const response = await axios.get(`${BASE_URL}search/photos`, {
    params: {
      query,
      page,
      per_page: 12,
      client_id: API_KEY,
    },
  });
  return response.data;
};

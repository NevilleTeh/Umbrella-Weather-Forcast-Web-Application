import axios from "axios";

const API_KEY = process.env.REACT_APP_STRAPI_API_KEY;
const BASE_URL = process.env.REACT_APP_STRAPI_API_URL;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const getNewsArticles = async () => {
  const response = await axiosClient.get("news-and-articles?populate=*");
  return response.data;
};

const getNewsArticleById = async (id) => {
  const response = await axiosClient.get(`news-and-articles/${id}?populate=*`);
  return response.data;
};

const searchNewsArticles = async (query) => {
  const response = await axiosClient.get(
    `news-and-articles?filters[Heading][$containsi]=${query}&populate=*`
  );
  return response.data;
};

export default { getNewsArticles, getNewsArticleById, searchNewsArticles };

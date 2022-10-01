import axios from "axios";

const news_api = axios.create({
  baseURL: "https://newsapi.org/v2/top-headlines",
});

export default news_api;

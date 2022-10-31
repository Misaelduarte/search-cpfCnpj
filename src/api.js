import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://node-search-tj.herokuapp.com/"
      : "http://localhost:7777/",
});

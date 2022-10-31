import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://little-voice-5240.fly.dev"
      : "http://localhost:7777/",
});

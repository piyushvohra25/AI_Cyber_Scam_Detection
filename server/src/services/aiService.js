import axios from "axios";
import { env } from "../config/env.js";

const aiClient = axios.create({
  baseURL: env.aiServiceUrl,
  timeout: 15000,
});

export const predictMessage = async (message) => {
  const { data } = await aiClient.post("/predict-message", { message });
  return data;
};

export const predictUrl = async (url) => {
  const { data } = await aiClient.post("/predict-url", { url });
  return data;
};

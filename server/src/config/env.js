import dotenv from "dotenv";

dotenv.config();

const requiredVariables = ["MONGODB_URI", "AI_SERVICE_URL"];

requiredVariables.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const env = {
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI,
  aiServiceUrl: process.env.AI_SERVICE_URL,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  nodeEnv: process.env.NODE_ENV || "development",
};

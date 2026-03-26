import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/analysisRoutes.js";
import { env } from "./config/env.js";
import { errorHandler } from "./utils/errorHandler.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.corsOrigin,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.use("/api", routes);
app.use(errorHandler);

export default app;

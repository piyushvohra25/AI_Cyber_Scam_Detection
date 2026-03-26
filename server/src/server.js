import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/db.js";

const startServer = async () => {
  try {
    await connectDatabase(env.mongoUri);

    app.listen(env.port, () => {
      console.log(`Server listening on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();

import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connection.js";
import openaiRoutes from "./routes/openaiRoutes.js";
import postRoutes from "./routes/postRoutes.js";
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/openai", openaiRoutes);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(4000, () => {
      console.log("server has started on port http://localhost:4000");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

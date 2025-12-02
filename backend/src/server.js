import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db-config.js";

const app = express();

const PORT = ENV.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "server is running ✅" });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on  http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server 💣:", error);
  }
};

startServer();

import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db-config.js";
import cors from "cors";
import { functions, inngest } from "./lib/inngest.js";
import { serve } from "inngest/express";

const app = express();

const PORT = ENV.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/inngest", serve({ client: inngest, functions }));

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

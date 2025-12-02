import express from "express";
import { ENV } from "./lib/env.js";

const app = express();

const PORT = ENV.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "server is running" });
});

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});

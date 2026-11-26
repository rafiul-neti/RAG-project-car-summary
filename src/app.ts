import cors from "cors";
import express, { json } from "express";

const app = express();

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    statusCode: 200,
    message: "Welcome to AI Enginnering Conceptual Backend!",
  });
});

export default app;

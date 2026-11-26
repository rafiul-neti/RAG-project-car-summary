import cors from "cors";
import express, { json } from "express";
import { carsRoutes, chatRoutes } from "./routes";

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

app.use("/cars", carsRoutes);
app.use("/chat", chatRoutes);

export default app;

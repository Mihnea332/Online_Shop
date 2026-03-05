import express from "express";
import dotenv from "dotenv";
import orderRoutes from "./routes/order_routes.js";
import userRoutes from "./routes/user_routes.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.get("/", (req, res) => {
  res.send("API-ul este activ!");
});
export default app;

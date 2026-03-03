import express from "express";
import dotenv from "dotenv";
import orderRoutes from "./routes/order_routes.js";
import userRoutes from "./routes/user_routes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("API-ul este activ!");
});
export default app;

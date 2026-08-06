import "./config/env.js";
import express from "express";
import orderRoutes from "./routes/order_routes.js";
import userRoutes from "./routes/user_routes.js";
import productRoutes from "./routes/product_routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.get("/", (req, res) => {
  res.send("API-ul este activ!");
});
export default app;

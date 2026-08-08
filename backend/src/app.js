import "./config/env.js";
import express from "express";
import orderRoutes from "./routes/order_routes.js";
import userRoutes from "./routes/user_routes.js";
import productRoutes from "./routes/product_routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "https://online-shop-page.onrender.com",
  "handmademom.de",
  ...(process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",")
        .map((origin) => origin.trim())
        .filter(Boolean)
    : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite cererile fără origin (ex: Postman sau curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(
        new Error("Blocat de CORS: Originea " + origin + " nu este permisă."),
      );
    },
    credentials: true, // Permite trimiterea de cookies/tokeni
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

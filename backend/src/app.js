import express from "express";
import dotenv from "dotenv";
import orderRoutes from "./routes/order_routes.js";
import userRoutes from "./routes/user_routes.js";
import productRoutes from "./routes/product_routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "https://online-shop-44y1-nine.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        /^https:\/\/online-shop-44y1-.*\.vercel\.app$/.test(origin)
      ) {
        return callback(null, true);
      }
      callback(new Error("Blocat de CORS"));
    },
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

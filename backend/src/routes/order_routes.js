import express from "express";
import { createOrder, getAllOrders } from "../controllers/order_controller.js";
import auth from "../middleware/auth.js";
const router = express.Router();
router.post("/", createOrder);
router.get("/", auth, getAllOrders);
export default router;

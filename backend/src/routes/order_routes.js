import express from "express";
import {
  createOrder,
  getAllOrders,
  deleteOrder,
  updateOrderStatus,
} from "../controllers/order_controller.js";
import auth from "../middleware/auth.js";
const router = express.Router();
router.post("/", createOrder);
router.get("/", auth, getAllOrders);
router.delete("/delete/:id", auth, deleteOrder);
router.put("/:id/status", auth, updateOrderStatus);
export default router;

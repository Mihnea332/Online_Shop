import express from "express";
import {
  createOrder,
  getAllOrders,
  deleteOrder,
  updateOrderStatus,
  verifyPayment,
  createPayPalOrder,
  capturePayPalOrder,
} from "../controllers/order_controller.js";
import auth from "../middleware/auth.js";
const router = express.Router();
router.post("/", createOrder);
router.get("/", auth, getAllOrders);
router.delete("/delete/:id", auth, deleteOrder);
router.put("/:id/status", auth, updateOrderStatus);
router.post("/verify-payment", verifyPayment);
router.post("/paypal/create", createPayPalOrder);
router.post("/paypal/capture", capturePayPalOrder);
export default router;

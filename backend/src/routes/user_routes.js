import express from "express";
import { registerUser, loginUser } from "../controllers/user_controller.js";
import auth from "../middleware/auth.js";
import { getMe } from "../controllers/user_controller.js";
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", auth, getMe);
export default router;

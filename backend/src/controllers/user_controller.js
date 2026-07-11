import { User } from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ensureDefaultAdmin = async () => {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminUsername || !adminSecret) return;

  const adminEmail = process.env.ADMIN_EMAIL || `${adminUsername}@local`;
  const existingAdmin = await User.findOne({
    $or: [{ username: adminUsername }, { email: adminEmail }],
  });

  if (existingAdmin) return;

  await User.create({
    username: adminUsername,
    email: adminEmail,
    password: adminSecret, // in clar - hook-ul din model face hash-ul
  });
};

// În controllers/auth_controller.js
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verifică dacă mai există cineva cu acest cont
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username sau Email deja utilizata" });
    }

    // 1. Criptează parola primită din API
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Salvează în MongoDB cu parola criptată
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Admin creat cu succes în baza de date!" });
  } catch (error) {
    res.status(500).json({
      message: "Eroare la server",
      error: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const identifier =
      req.body.email || req.body.username || req.body.identifier;
    const { password } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Email sau parolă greșită" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "72h" },
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login reușit!",
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ message: "Eroare la server", error: error.message });
  }
};
const getMe = async (req, res) => {
  res.status(200).json({ user: req.user });
};
export { ensureDefaultAdmin, registerUser, loginUser, getMe };

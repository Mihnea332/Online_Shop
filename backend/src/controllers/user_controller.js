import { User } from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ensureDefaultAdmin = async () => {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminUsername || !adminSecret) {
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL || `${adminUsername}@local`;
  const existingAdmin = await User.findOne({
    $or: [{ username: adminUsername }, { email: adminEmail }],
  });

  if (existingAdmin) {
    return;
  }

  await User.create({
    username: adminUsername,
    email: adminEmail,
    password: adminSecret,
  });
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "Username sau Email deja utilizata" });
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "Admin creat cu succes" });
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
    if (!user)
      return res.status(401).json({ message: "Email sau parola gresita" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Email sau parola gresita" });
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    res.status(200).json({
      message: "Login reusit!",
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Eroare la server",
      error: error.message,
    });
  }
};
export { ensureDefaultAdmin, registerUser, loginUser };

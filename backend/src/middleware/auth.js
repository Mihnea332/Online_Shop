import "../config/env.js";
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const bearerToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : null;
  const token = bearerToken || (req.cookies ? req.cookies.auth_token : null);

  if (!token) {
    return res.status(401).json({ message: "Acces refuzat. Nu esti logat" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie("auth_token");
    return res.status(401).json({ message: "Token invalid sau expirat" });
  }
};

export default auth;

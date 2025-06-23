import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access denied: No token" });

    try {
      const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
      req.user = verified;

      if (!allowedRoles.includes(verified.role)) {
        return res.status(403).json({ error: "Access denied: Insufficient role" });
      }

      next();
    } catch (err) {
      res.status(400).json({ error: "Invalid Token" });
    }
  };
};
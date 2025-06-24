import { verifyAccessToken } from "../utils/jwt.js";

// Verify JWT tokens
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Missing token" });

    const payload = verifyAccessToken(token);

    if (!payload) return res.status(403).json({ message: "Invalid token" });

    req.user = payload;
    next();
};

// Check if the user is an admin
export const isAdmin = (req, res, next) => {
    if (!req.user?.isAdmin) {
        return res.status(403).json({ message: "Access denied: Admins only" });
    }
    next();
};

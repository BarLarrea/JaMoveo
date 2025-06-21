import { verifyAccessToken } from "../utils/jwt.js";

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1]; // "Bearer <token>"

    if (!token) return res.status(401).json({ message: "Missing token" });

    const payload = verifyAccessToken(token); // ← כאן קראתי לפונקציית utility

    if (!payload) return res.status(403).json({ message: "Invalid token" });

    req.user = payload;
    next();
}

export default authenticateToken;
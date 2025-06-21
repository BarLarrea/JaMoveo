import jwt from "jsonwebtoken";

export function generateAccessToken(user) {
    if (!user) {
        throw new Error("Invalid user payload for token generation");
    }
    const payload = {
        userId: user._id,
        isAdmin: user.isAdmin,
        isSinger: user.isSinger,
        instrument: user.isSinger ? null : user.instrument
    };

    return jwt.sign(payload, process.env.ACCESS_JWT_SECRET, {
        expiresIn: process.env.ACCESS_JWT_EXPIRATION
    });
}

export function verifyAccessToken(token) {
    try {
        return jwt.verify(token, process.env.ACCESS_JWT_SECRET);
    } catch (err) {
        return null;
    }
}

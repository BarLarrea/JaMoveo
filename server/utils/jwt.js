import jwt from "jsonwebtoken";

const secret = process.env.ACCESS_JWT_SECRET;
const expiration = process.env.ACCESS_JWT_EXPIRATION;

function generateAccessToken(user) {
    if (!user || !user.id) {
        throw new Error("Invalid user payload for token generation");
    }
    const payload = {
        userId: user.id,
        role: user.role,
        isSinger: user.isSinger,
        instrument: user.isSinger ? null : user.instrument
    };

    return jwt.sign(payload, secret, { expiresIn: expiration });
}

export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    } catch (err) {
        return null;
    }
};

export default (generateAccessToken, verifyAccessToken);

import jwt from "jsonwebtoken";

const secret = process.env.ACCESS_JWT_SECRET;
const expiration = process.env.ACCESS_JWT_EXPIRATION;

function generateAccessToken(user) {
    if (!user) {
        throw new Error("Invalid user payload for token generation");
    }
    const payload = {
        userId: user._id,
        isAdmin: user.isAdmin,
        isSinger: user.isSinger,
        instrument: user.isSinger ? null : user.instrument
    };

    return jwt.sign(payload, secret, { expiresIn: expiration });
}

export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }
};

export default {
    generateAccessToken,
    verifyAccessToken
};

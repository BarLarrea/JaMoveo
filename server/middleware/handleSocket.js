import { verifyAccessToken } from "../utils/jwt.js";

export default function handleSocket(io) {
    // Middleware to authenticate each socket connection
    io.use((socket, next) => {
        const token = socket.handshake.auth?.token;

        if (!token) {
            return next(new Error("Authentication error: Missing token"));
        }

        const payload = verifyAccessToken(token);

        if (!payload) {
            return next(new Error("Authentication error: Invalid token"));
        }

        socket.user = payload; // Attach user data to socket
        next();
    });

    let currentSong = null;

    // Handle events after authentication
    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id, "User:", socket.user);

        // Optional: emit current song to new user
        if (currentSong) {
            socket.emit("song-selected", currentSong);
        }

        socket.on("select-song", ({ fileName }) => {
            if (!socket.user?.isAdmin) return;
            currentSong = { fileName };
            io.emit("song-selected", currentSong);
        });

        socket.on("quit", () => {
            if (!socket.user?.isAdmin) return;
            currentSong = null;
            io.emit("quit");
        });

        socket.on("scroll-toggle", (state) => {
            io.emit("scroll-toggle", state);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
    });
}

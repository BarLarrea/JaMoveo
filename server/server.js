import dotenv from "dotenv";
import express from "express";
import http from "http";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { Server } from "socket.io";
import handleSocket from "./sockets/songSocket.js";
import cors from "cors";
import songRoutes from "./routes/songRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB, then start the server
connectDB(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);

// Real time state
let currentSong = null;

// Socket.io
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

handleSocket(io);

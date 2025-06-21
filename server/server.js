import dotenv from "dotenv";
import express from "express";
import http from "http";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { Server } from "socket.io";
import handleSocket from "./sockets/songSocket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
    res.send("Hello JaMoveo");
});

// Connect to MongoDB, then start the server
connectDB(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

// Routes setup
app.use("/api/auth", authRoutes);

// Real time state
let currentSong = null;

// Socket.io setup
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

handleSocket(io);
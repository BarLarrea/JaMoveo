import exprress from "express";
import http from "http";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Load environment variables from .env file
dotenv.config();

// Importing necessary modules
const app = exprress();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

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

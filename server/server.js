import exprress from "express";
import http from "http";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Importing necessary modules
const app = exprress();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

// Starting the server
app.get("/", (req, res) => {
    res.send("Hello JaMoveo");
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

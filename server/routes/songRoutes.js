import express from "express";
import { authenticateToken, isAdmin } from "../middleware/authMiddleware.js.js";
import {
    searchSongs,
    getSongByFileName
} from "../controllers/songController.js";

const router = express.Router();

router.get("/", authenticateToken, isAdmin, searchSongs);

router.get("/:file", authenticateToken, isAdmin, getSongByFileName);

export default router;

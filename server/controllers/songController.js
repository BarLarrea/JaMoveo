import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Search songs by query - returns only metadata from index
export const searchSongs = (req, res) => {
    const query = req.query.query?.toLowerCase() || "";
    const indexPath = path.join(__dirname, "..", "data", "songsIndex.json");

    try {
        const indexRaw = fs.readFileSync(indexPath, "utf-8");
        const index = JSON.parse(indexRaw);

        const results = index.filter((song) => {
            const name = song.name?.toLowerCase() || "";
            const artist = song.artist?.toLowerCase() || "";
            const altNames = song.altNames?.map((n) => n.toLowerCase()) || [];
            const altArtists =
                song.altArtists?.map((a) => a.toLowerCase()) || [];

            return (
                name.includes(query) ||
                artist.includes(query) ||
                altNames.some((n) => n.includes(query)) ||
                altArtists.some((a) => a.includes(query))
            );
        });

        res.status(200).json(results);
    } catch (error) {
        console.error("Error searching songs:", error);
        res.status(500).json({
            message: "Error searching songs",
            error: error.message
        });
    }
};

// Load full song content by file name
export const getSongByFileName = (req, res) => {
    const fileName = req.params.file;
    const songPath = path.join(__dirname, "..", "data", fileName);

    try {
        if (!fs.existsSync(songPath)) {
            return res.status(404).json({ message: "Song file not found" });
        }

        const songContent = fs.readFileSync(songPath, "utf-8");
        const song = JSON.parse(songContent);

        res.status(200).json(song);
    } catch (error) {
        console.error("Error reading song file:", error);
        res.status(500).json({
            message: "Error reading song",
            error: error.message
        });
    }
};

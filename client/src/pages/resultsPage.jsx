import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/ui/Spinner";
import Layout from "../components/layout/Layout";
import SongCard from "../components/cards/SongCard";
import socket from "../socket";
import { useNavigate } from "react-router-dom";

export default function ResultsPage() {
    const location = useLocation();
    const [query, setQuery] = useState("");
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        socket.on("song-selected", (song) => {
            console.log("Received song from socket:", song);
            if (!song?.fileName) return;
            navigate(`/live?song=${encodeURIComponent(song.fileName)}`);
        });
        return () => socket.off("song-selected");
    }, [navigate]);

    const handleSongSelect = (song) => {
        socket.emit("select-song", { fileName: song.fileName });
    };

    // Fetch songs from the backend based on search query
    const fetchSongs = async (searchQuery) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/songs`,
                {
                    params: { query: searchQuery },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (Array.isArray(response.data)) {
                setSongs(response.data);
            } else {
                console.warn("Unexpected response format:", response.data);
                setSongs([]);
            }
        } catch (error) {
            console.error("Failed to fetch songs:", error);
            setSongs([]);
        } finally {
            setLoading(false);
        }
    };

    // Extract the search query from the URL and perform the API call - sensitive to any changes in the URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get("query")?.trim() || "";
        setQuery(searchQuery);

        if (!searchQuery) return;

        setLoading(true);
        fetchSongs(searchQuery);
    }, [location.search]);

    return (
        <Layout>
            <div className='max-w-3xl w-full mx-auto px-6 py-8 space-y-6'>
                {/* Page title and subtitle */}
                <div className='text-left'>
                    <h1 className='text-3xl font-bold text-gray-800'>
                        Search Results
                    </h1>
                    {query && (
                        <p className='text-gray-600 mt-1'>
                            Results for:{" "}
                            <span className='font-semibold'>"{query}"</span>
                        </p>
                    )}
                </div>

                {/* Show loading spinner while fetching */}
                {loading ? (
                    <Spinner message='Searching your song...' />
                ) : songs.length > 0 ? (
                    // Display results
                    <div className='flex flex-col gap-4'>
                        {songs.map((song, idx) => (
                            <SongCard
                                key={idx}
                                song={song}
                                onSelect={handleSongSelect}
                            />
                        ))}
                    </div>
                ) : (
                    // Fallback message when no songs match
                    <div className='text-center text-gray-500 py-8'>
                        <p className='text-lg font-medium'>No songs found.</p>
                        <p className='text-sm mt-2'>
                            Try searching with different keywords.
                        </p>
                        <div className='mt-6'>
                            <button
                                onClick={() => navigate("/mainPageAdmin")}
                                className='text-blue-600 hover:underline text-sm font-medium opacity-70 hover:opacity-100 transition'
                            >
                                ← Back to Search
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

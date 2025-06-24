import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/Layout";
import { Music } from "lucide-react";
import LiveHeader from "../components/liveRoom/LiveHeader";
import LiveControls from "../components/liveRoom/LiveControls";
import LyricsWithChords from "../components/liveRoom/LyricsWithChords";
import LyricsOnly from "../components/liveRoom/LyricsOnly";
import socket from "../socket";
import { songsApiUrl, renderBackendURL } from "../constants/urls";
import Spinner from "../components/ui/Spinner";

export default function LiveRoomPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [songLines, setSongLines] = useState(null);
    const [songMeta, setSongMeta] = useState({ name: "", artist: "" });
    const [loading, setLoading] = useState(true);
    const [autoScroll, setAutoScroll] = useState(false);
    const scrollTimerRef = useRef(null);
    const scrollAreaRef = useRef(null);

    const token = localStorage.getItem("token");
    const user = token ? JSON.parse(atob(token.split(".")[1])) : null;

    const params = new URLSearchParams(location.search);
    const songFileName = params.get("song");

    useEffect(() => {
        if (!songFileName) return;

        const loadSong = async () => {
            try {
                const { data } = await axios.get(
                    `${renderBackendURL}${songsApiUrl}${songFileName}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setSongLines(data.content || data);
                setSongMeta({
                    name: data.name || songFileName,
                    artist: data.artist || "Unknown Artist"
                });
            } catch (err) {
                console.error("Could not fetch song:", err);
            } finally {
                setLoading(false);
            }
        };

        loadSong();
    }, [songFileName, token]);

    useEffect(() => {
        if (autoScroll) {
            const scrollStep = window.innerWidth < 600 ? 14 : 2;
            scrollTimerRef.current = setInterval(() => {
                const el = scrollAreaRef.current;
                if (!el) return;

                // Stop scrolling if we're at the bottom
                const threshold = 5;
                const atBottom =
                    el.scrollTop + el.clientHeight >=
                    el.scrollHeight - threshold;
                if (atBottom) {
                    clearInterval(scrollTimerRef.current);
                    setAutoScroll(false);
                    return;
                }

                el.scrollBy({ top: scrollStep, behavior: "smooth" });
            }, 100);
        } else {
            clearInterval(scrollTimerRef.current);
        }

        return () => clearInterval(scrollTimerRef.current);
    }, [autoScroll]);

    const toggleScroll = () => {
        if (user?.isAdmin) {
            socket.emit("scroll-toggle", !autoScroll);
        }
    };

    useEffect(() => {
        socket.on("scroll-toggle", (state) => {
            setAutoScroll(state);
        });

        return () => {
            socket.off("scroll-toggle");
        };
    }, []);

    useEffect(() => {
        socket.on("quit", () => {
            navigate(user?.isAdmin ? "/mainPageAdmin" : "/mainPageUser");
        });

        return () => {
            socket.off("quit");
        };
    }, [user, navigate]);

    const handleExit = () => {
        if (user?.isAdmin) {
            socket.emit("quit");
        }
    };

    if (loading) {
        return (
            <Layout>
                <Spinner message='Loading song...' />
            </Layout>
        );
    }

    if (!songLines) {
        return (
            <Layout>
                <div className='min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-purple-900 flex items-center justify-center'>
                    <div className='text-center'>
                        <Music className='h-16 w-16 text-red-400 mx-auto mb-4' />
                        <p className='text-2xl text-white font-medium'>
                            Song not found.
                        </p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative'>
            <LiveHeader
                name={songMeta.name}
                artist={songMeta.artist}
            />

            <div
                ref={scrollAreaRef}
                className='max-w-6xl mx-auto px-6 py-12 overflow-y-auto'
                style={{
                    maxHeight: "calc(100vh - 200px)",
                    paddingBottom: "120px"
                }}
            >
                {user?.bandRole === "singer" || user?.bandRole === "" ? (
                    <LyricsOnly song={songLines} />
                ) : (
                    <LyricsWithChords song={songLines} />
                )}
            </div>

            {user?.isAdmin && (
                <LiveControls
                    isAutoScrolling={autoScroll}
                    onToggleScroll={toggleScroll}
                    onQuit={handleExit}
                />
            )}
        </div>
    );
}

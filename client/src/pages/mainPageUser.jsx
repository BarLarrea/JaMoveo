import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import socket from "../socket";
import { Music2 } from "lucide-react";

export default function MainPageUser() {
    const navigate = useNavigate();

    useEffect(() => {
        socket.on("song-selected", (song) => {
            navigate(`/liveRoom?song=${song.file}`);
        });

        return () => {
            socket.off("song-selected");
        };
    }, [navigate]);

    return (
        <Layout>
            <div className='h-full flex flex-col justify-start items-center pt-32 text-center px-4'>
                {/* Icon with gentle animation */}
                <div className='flex justify-center mb-6'>
                    <Music2 className='h-12 w-12 text-blue-600' />
                </div>

                {/* Text with opacity animation instead of pulse */}
                <div className='space-y-4'>
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2 animate-pulse opacity-100'>
                        Waiting for the jam to start...
                    </h1>
                    <p className='text-lg text-gray-600 animate-pulse opacity-100'>
                        Please hold on while the admin picks a song 🎶
                    </p>
                </div>

                {/* Loading dots */}
                <div className='flex space-x-2 mt-8'>
                    <div className='w-2 h-2 bg-blue-600 rounded-full animate-bounce'></div>
                    <div className='w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.1s]'></div>
                    <div className='w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]'></div>
                </div>
            </div>
        </Layout>
    );
}

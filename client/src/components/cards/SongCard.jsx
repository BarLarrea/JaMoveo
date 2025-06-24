import { useState } from "react";
import socket from "../../socket";

export default function SongCard({ song }) {
    const { name, artist, imageUrl } = song;
    const [showConfirm, setShowConfirm] = useState(false);

    const handleConfirm = () => {
        setShowConfirm(false);
        socket.emit("select-song", song);
    };

    return (
        <div className='w-full'>
            <div
                className='bg-blue-50 bg-opacity-50 p-4 rounded-lg shadow-sm border border-gray-300 w-full cursor-pointer hover:shadow-md transition'
                onClick={() => setShowConfirm(true)}
            >
                {/* Content Row */}
                <div className='flex items-start gap-4'>
                    <img
                        src={imageUrl || "/songPlaceholder.png"}
                        alt={name}
                        className='w-24 h-24 rounded-md border border-gray-300 object-cover flex-shrink-0'
                    />
                    <div className='flex-1'>
                        <h2 className='text-xl font-semibold text-blue-700'>
                            {name}
                        </h2>
                        <p className='text-gray-600'>{artist}</p>
                    </div>
                </div>

                {/* Live Confirm Banner */}
                {showConfirm && (
                    <div
                        className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setShowConfirm(false);
                            }
                        }}
                    >
                        <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm text-center'>
                            <h3 className='text-lg font-bold mb-2'>Go Live?</h3>
                            <p className='text-gray-700 mb-4'>
                                Lets light it up! Ready to go live room with{" "}
                                <strong>{name}</strong>?
                            </p>
                            <div className='flex justify-center gap-4'>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowConfirm(false);
                                    }}
                                    className='bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400'
                                >
                                    No
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleConfirm();
                                    }}
                                    className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

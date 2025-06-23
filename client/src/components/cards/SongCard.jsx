import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SongCard({ song }) {
    const { name, artist, imageUrl } = song;
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    const handleConfirm = () => {
        setShowConfirm(false);
        navigate(`/live?song=${encodeURIComponent(name)}`);
    };

    return (
        <div
            className='relative border rounded-lg shadow-sm p-4 flex items-center gap-4 hover:bg-gray-50 transition cursor-pointer'
            onClick={() => setShowConfirm(true)}
        >
            <img
                src={imageUrl || "/placeholder.jpg"}
                alt={name}
                className='w-20 h-20 object-cover rounded-md'
            />
            <div>
                <h2 className='text-lg font-semibold text-gray-800'>{name}</h2>
                <p className='text-gray-600'>{artist}</p>
            </div>

            {showConfirm && (
                <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10'>
                    <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm text-center'>
                        <h3 className='text-lg font-bold mb-2'>Go Live?</h3>
                        <p className='text-gray-700 mb-4'>
                            Are you sure you want to join the live room for{" "}
                            <strong>{name}</strong>?
                        </p>
                        <div className='flex justify-center gap-4'>
                            <button
                                onClick={handleConfirm}
                                className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className='bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400'
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

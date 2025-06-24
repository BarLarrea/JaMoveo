import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";

export default function AdminMainPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (!searchQuery.trim()) return;
        navigate(`/results?query=${encodeURIComponent(searchQuery.trim())}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <Layout>
            <div className='flex flex-col items-center justify-center text-center space-y-6 pt-28 px-4'>
                <div>
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2 drop-shadow'>
                        Search any song...
                    </h1>
                    <p className='text-gray-600 text-base'>
                        Search by title or artist name 🎶
                    </p>
                </div>

                <div className='w-full max-w-md space-y-4'>
                    <input
                        type='text'
                        placeholder='Search songs...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='w-full border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />

                    <button
                        onClick={handleSearch}
                        className='w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition'
                    >
                        Search
                    </button>
                </div>
            </div>
        </Layout>
    );
}

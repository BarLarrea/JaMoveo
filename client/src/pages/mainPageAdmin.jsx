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
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <Layout>
            <div className='text-left mb-6'>
                <h1 className='text-3xl font-bold'>Search any song...</h1>
                <p className='text-gray-600'>Search by title or artist name</p>
            </div>

            <div className='flex justify-center mb-4'>
                <input
                    type='text'
                    placeholder='Search songs...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className='border rounded px-4 py-2 w-1/2'
                />
            </div>

            <div className='flex justify-center'>
                <button
                    onClick={handleSearch}
                    className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition'
                >
                    Search
                </button>
            </div>
        </Layout>
    );
}

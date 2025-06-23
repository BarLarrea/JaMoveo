import Spinner from "../components/ui/Spinner";
import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ResultsPage() {
    const location = useLocation();
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get("query")?.trim() || "";
        setQuery(searchQuery);

        setLoading(true);
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [location.search]);

    return (
        <Layout>
            <div className='text-left mb-6'>
                <h1 className='text-3xl font-bold'>Search Results</h1>
                <p className='text-gray-600'>
                    Results for: <span className='font-medium'>{query}</span>
                </p>
            </div>

            {loading ? (
                <Spinner message='Searching your song...' />
            ) : (
                <div className='text-center text-gray-500'>
                    <p>No results found yet (mock content)</p>
                </div>
            )}
        </Layout>
    );
}

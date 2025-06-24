import { useNavigate } from "react-router-dom";
import socket from "../../socket";
import { LogOut } from "lucide-react";

export default function Layout({ children }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        socket.disconnect();
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className='min-h-screen flex flex-col bg-white text-gray-900'>
            {/* HEADER */}
            <header className='bg-slate-800 text-white shadow-sm py-9 flex-shrink-0 border-b border-gray-200 relative'>
                <div className='max-w-6xl mx-auto px-6 relative flex items-center justify-center'>
                    {/* Centered Logo */}
                    <div className='absolute left-1/2 -translate-x-1/2 flex items-center gap-2'>
                        <span className='text-lg text-gray-300'>♪</span>
                        <h1 className='text-2xl font-semibold tracking-tight text-white'>
                            JaMoveo
                        </h1>
                    </div>

                    {/* Logout Icon on the Right */}
                    {token && (
                        <button
                            onClick={handleLogout}
                            className='absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-transparent hover:bg-slate-700 rounded transition flex items-center gap-2 group'
                        >
                            <LogOut className='h-5 w-5 text-white' />
                            <span className='hidden sm:inline text-white text-sm font-medium'>
                                Logout
                            </span>
                        </button>
                    )}
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className='flex-1 flex items-center justify-center bg-slate-400'>
                <div className='w-full max-w-md px-6 py-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl min-h-[calc(100vh-8rem)]'>
                    {children}
                </div>
            </main>

            {/* FOOTER */}
            <footer className='bg-gray-50 border-t border-gray-200 text-center py-3 flex-shrink-0'>
                <div className='max-w-6xl mx-auto px-6'>
                    <p className='text-sm text-gray-500'>
                        © {new Date().getFullYear()} JaMoveo
                    </p>
                </div>
            </footer>
        </div>
    );
}

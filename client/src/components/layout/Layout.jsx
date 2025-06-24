export default function Layout({ children }) {
    return (
        <div className='min-h-screen flex flex-col bg-white text-gray-900'>
            {/* HEADER */}
            <header className='bg-slate-800 text-white shadow-sm py-4 flex-shrink-0 border-b border-gray-200'>
                <div className='max-w-6xl mx-auto flex items-center justify-center px-6'>
                    <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 flex items-center justify-center'>
                            <span className='text-lg text-gray-300'>♪</span>
                        </div>
                        <h1 className='text-2xl font-semibold tracking-tight text-white'>
                            JaMoveo
                        </h1>
                    </div>
                </div>
            </header>

            {/* MAIN */}
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

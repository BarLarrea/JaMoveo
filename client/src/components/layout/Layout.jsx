import Container from "./Container";

export default function Layout({ children }) {
    return (
        <div className='min-h-screen flex flex-col bg-white text-gray-900'>
            {/* HEADER */}
            <header className='bg-blue-600 text-white shadow py-6'>
                <div className='max-w-md mx-auto flex items-center justify-center gap-2 px-4'>
                    <span className='text-4xl'>🎵</span>
                    <h1 className='text-3xl font-bold tracking-tight'>
                        JaMoveo
                    </h1>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className='flex flex-col flex-1 items-center max-w-screen-md mx-auto w-full px-4 sm:px-6 md:px-8 bg-white shadow-lg rounded-lg py-8 overflow-y-auto'>
                <div className='w-full max-w-md'>{children}</div>
            </main>

            {/* FOOTER */}
            <footer className='bg-blue-50 text-center text-sm text-gray-600 py-4'>
                &copy; {new Date().getFullYear()} JaMoveo. All rights reserved.
            </footer>
        </div>
    );
}

import Container from "./Container";

export default function Layout({ children }) {
    return (
        <div className='min-h-screen flex flex-col bg-gray-50 text-gray-900'>
            {/* Header */}
            <header className='w-full py-4 bg-blue-600 text-white shadow'>
                <Container>
                    <h1 className='text-xl font-semibold'>🎵 JaMoveo</h1>
                </Container>
            </header>

            {/* Main Content */}
            <main className='flex-1 py-8'>
                <Container>{children}</Container>
            </main>

            {/* Footer */}
            <footer className='w-full py-4 bg-blue-100 text-center text-sm text-gray-700'>
                <p>
                    &copy; {new Date().getFullYear()} JaMoveo. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
}

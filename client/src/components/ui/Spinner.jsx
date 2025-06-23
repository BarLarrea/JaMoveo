export default function Spinner({ message = "Loading..." }) {
    return (
        <div className='fixed inset-0 z-50 bg-white bg-opacity-80 flex flex-col items-center justify-center'>
            <div className='relative w-16 h-16 sm:w-12 sm:h-12'>
                <div className='absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
                <div className='absolute inset-2 border-4 border-blue-300 border-t-transparent rounded-full animate-spin-slower'></div>
            </div>
            <p className='mt-6 text-gray-700 text-xl sm:text-lg font-medium text-center animate-pulse'>
                {message}
            </p>
        </div>
    );
}

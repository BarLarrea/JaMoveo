export default function LiveHeader({ name, artist }) {
    return (
        <div className='sticky top-0 z-10 bg-black/50 backdrop-blur-sm border-b border-white/20'>
            <div className='max-w-6xl mx-auto px-4 py-4 sm:px-6 sm:py-6 text-center'>
                <h1 className='text-3xl sm:text-5xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg'>
                    Live Room
                </h1>
                <h2 className='text-xl sm:text-3xl text-yellow-300 font-semibold drop-shadow-lg'>
                    {name}
                </h2>
                <p className='text-sm sm:text-xl text-gray-300 mt-1 sm:mt-2 drop-shadow-lg'>
                    by {artist}
                </p>
            </div>
        </div>
    );
}

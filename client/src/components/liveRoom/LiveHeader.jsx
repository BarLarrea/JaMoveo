export default function LiveHeader({ name, artist }) {
    return (
        <div className='sticky top-0 z-10 bg-black/50 backdrop-blur-sm border-b border-white/20'>
            <div className='max-w-6xl mx-auto px-6 py-6 text-center'>
                <h1 className='text-5xl font-bold text-white mb-2 drop-shadow-lg'>
                    Live Room
                </h1>
                <h2 className='text-3xl text-yellow-300 font-semibold drop-shadow-lg'>
                    {name}
                </h2>
                <p className='text-xl text-gray-300 mt-2 drop-shadow-lg'>
                    by {artist}
                </p>
            </div>
        </div>
    );
}

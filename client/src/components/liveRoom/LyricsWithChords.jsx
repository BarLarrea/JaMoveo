"use client";

export default function LyricsWithChords({ song }) {
    const hasHebrew = song.some((line) =>
        line.some((part) => /[\u0590-\u05FF]/.test(part.lyrics))
    );

    return (
        <div
            className={`max-w-6xl mx-auto px-6 py-10 space-y-12 font-sans text-4xl leading-relaxed ${
                hasHebrew ? "rtl" : "ltr"
            }`}
        >
            {song.map((line, lineIndex) => (
                <div
                    key={lineIndex}
                    className='w-full'
                >
                    <div
                        className={`flex flex-wrap items-end gap-x-4 gap-y-16 ${
                            hasHebrew ? "flex-row-reverse" : ""
                        }`}
                    >
                        {line.map((part, partIndex) => (
                            <div
                                key={partIndex}
                                className='relative inline-block'
                            >
                                {part.chords && (
                                    <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 text-yellow-300 font-bold text-3xl drop-shadow-lg whitespace-nowrap'>
                                        {part.chords}
                                    </div>
                                )}
                                <span className='text-white drop-shadow-lg inline-block'>
                                    {part.lyrics}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

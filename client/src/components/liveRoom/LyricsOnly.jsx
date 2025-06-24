export default function LyricsOnly({ song }) {
    const hasHebrew = song.some((line) =>
        line.some((part) => /[\u0590-\u05FF]/.test(part.lyrics))
    );

    return (
        <div
            className={`max-w-6xl mx-auto px-6 py-10 space-y-8 font-sans text-5xl leading-relaxed font-medium ${
                hasHebrew ? "rtl" : "ltr"
            }`}
        >
            {song.map((line, i) => (
                <p
                    key={i}
                    className='text-white drop-shadow-lg text-center'
                >
                    {line.map((part) => part.lyrics).join(" ")}
                </p>
            ))}
        </div>
    );
}

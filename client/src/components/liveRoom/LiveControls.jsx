import { Play, Pause, Power } from "lucide-react";

export default function LiveControls({
    isAutoScrolling,
    onToggleScroll,
    onQuit
}) {
    return (
        <div className='fixed bottom-6 sm:bottom-8 right-6 flex flex-row gap-4 z-50'>
            <button
                onClick={onQuit}
                className='p-4 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110'
                title='Quit Live Room'
            >
                <Power className='h-8 w-8' />
            </button>
            <button
                onClick={onToggleScroll}
                className={`p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
                    isAutoScrolling
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                }`}
                title={
                    isAutoScrolling ? "Stop Auto Scroll" : "Start Auto Scroll"
                }
            >
                {isAutoScrolling ? (
                    <Pause className='h-8 w-8' />
                ) : (
                    <Play className='h-8 w-8' />
                )}
            </button>
        </div>
    );
}

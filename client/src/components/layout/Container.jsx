export default function Container({ children }) {
    return (
        <div className='w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8'>
            {children}
        </div>
    );
}

import TextInput from "../ui/TextInput";

export default function LoginForm({
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit
}) {
    return (
        <form
            onSubmit={handleSubmit}
            className='space-y-6'
        >
            <TextInput
                label='Email'
                name='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
            />

            <TextInput
                label='Password'
                name='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
            />

            <button
                type='submit'
                className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200'
            >
                Login
            </button>
        </form>
    );
}

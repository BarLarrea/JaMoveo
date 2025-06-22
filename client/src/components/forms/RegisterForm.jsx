import TextInput from "../ui/TextInput";
import Dropdown from "../ui/Dropdown";

const roleOptions = [
    { value: "singer", label: "🎤 Singer" },
    { value: "player", label: "🎸 Player" }
];

const instrumentOptions = [
    { value: "guitar", label: "🎸 Guitar" },
    { value: "drums", label: "🥁 Drums" },
    { value: "bass", label: "🎸 Bass" },
    { value: "keyboard", label: "🎹 Keyboard" },
    { value: "saxophone", label: "🎷 Saxophone" },
    { value: "trumpet", label: "🎺 Trumpet" },
    { value: "violin", label: "🎻 Violin" },
    { value: "other", label: "🎶 Other" }
];

export default function RegisterForm({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    isSinger,
    setIsSinger,
    instrument,
    setInstrument,
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
                label='First Name'
                name='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='Enter your first name'
            />

            <TextInput
                label='Last Name'
                name='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='Enter your last name'
            />

            {/* Role Dropdown */}
            <Dropdown
                label='What is your role?'
                options={roleOptions}
                value={isSinger === null ? "" : isSinger ? "singer" : "player"}
                onChange={(val) => setIsSinger(val === "singer")}
            />
            {/* Instrument Dropdown */}
            {isSinger === false && (
                <Dropdown
                    label='Select your instrument'
                    options={instrumentOptions}
                    value={instrument}
                    onChange={setInstrument}
                />
            )}

            <TextInput
                label='Password'
                name='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                helperText='Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.'
            />

            <button
                type='submit'
                className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out'
            >
                Register
            </button>
        </form>
    );
}

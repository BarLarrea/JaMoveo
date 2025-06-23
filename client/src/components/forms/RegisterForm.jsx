import TextInput from "../ui/TextInput";
import Dropdown from "../ui/Dropdown";
import { roleOptions, instrumentOptions } from "../../constants/formOptions";

export default function RegisterForm({
    formData,
    handleChange,
    handleSubmit,
    isAdmin
}) {
    const {
        firstName,
        lastName,
        bandRole,
        instrument,
        email,
        password,
        adminCode
    } = formData;
    return (
        <form
            onSubmit={handleSubmit}
            className='space-y-6'
            autoComplete='on'
        >
            <TextInput
                label='Email'
                name='email'
                type='email'
                value={email}
                onChange={(e) => handleChange("email")(e.target.value)}
                placeholder='Enter your email'
                autoComplete='email'
            />

            <TextInput
                label='First Name'
                name='firstName'
                value={firstName}
                onChange={(e) => handleChange("firstName")(e.target.value)}
                placeholder='Enter your first name'
                autoComplete='given-name'
            />

            <TextInput
                label='Last Name'
                name='lastName'
                value={lastName}
                onChange={(e) => handleChange("lastName")(e.target.value)}
                placeholder='Enter your last name'
                autoComplete='family-name'
            />

            {/* Role Dropdown */}
            <Dropdown
                label='What is your Band-Role?'
                options={roleOptions}
                value={formData.bandRole}
                onChange={handleChange("bandRole")}
            />

            {/* Instrument Dropdown */}
            {bandRole === "player" && (
                <Dropdown
                    label='Select your instrument'
                    options={instrumentOptions}
                    value={instrument}
                    onChange={handleChange("instrument")}
                />
            )}

            <TextInput
                label='Password'
                name='password'
                type='password'
                value={password}
                onChange={(e) => handleChange("password")(e.target.value)}
                placeholder='Enter your password'
                helperText='Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.'
                autoComplete='new-password'
            />

            {isAdmin && (
                <TextInput
                    label='Admin Code'
                    name='adminCode'
                    type='password'
                    value={adminCode}
                    onChange={(e) => handleChange("adminCode")(e.target.value)}
                    placeholder='Enter admin secret code'
                    autoComplete='off'
                    helperText='You should get it from the system maneger.'
                />
            )}

            <button
                type='submit'
                className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out'
            >
                Register
            </button>
        </form>
    );
}

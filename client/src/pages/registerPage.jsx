import { useLocation } from "react-router-dom";
import { useState } from "react";
import { validateEmail, validatePassword } from "../utils/validation";
import { registerUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isSinger, setIsSinger] = useState(null);
    const [instrument, setInstrument] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminCode, setAdminCode] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const isAdmin = location.pathname.includes("/admin"); // Check if the user is registering as an admin

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        //validate inputs
        if (!firstName || !lastName || !email || !password) {
            alert("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        if (!isSinger && !instrument) {
            alert("Please select an instrument if you are a music player.");
            setLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            setLoading(false);
            return;
        }

        if (!validatePassword(password)) {
            alert(
                "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
            );
            setLoading(false);
            return;
        }
        // Make API call only if all validations pass
        const response = await registerUser({
            firstName,
            lastName,
            isSinger,
            instrument,
            email,
            password,
            isAdmin,
            adminCode: isAdmin ? adminCode : undefined // Only include adminCode if registering as admin
        });

        if (response?.success) {
            alert("Registration successful!");
            navigate("/login");
        } else {
            alert(response?.message || "Registration failed.");
        }

        setLoading(false);
    };

    return (
        <Layout>
            <div className='text-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-800'>
                    Create your account
                </h2>
                <p className='mt-2 text-gray-600'>
                    Please, fill in your details to register
                </p>
            </div>
            <RegisterForm
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                isSinger={isSinger}
                setIsSinger={setIsSinger}
                instrument={instrument}
                setInstrument={setInstrument}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
                adminCode={adminCode}
                setAdminCode={setAdminCode}
                isAdmin={isAdmin}
            />
            <div className='mt-4 text-center'>
                <p className='text-gray-600'>
                    Already have an account?{" "}
                    <Link
                        to='/login'
                        className='text-blue-500 hover:underline'
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </Layout>
    );
}

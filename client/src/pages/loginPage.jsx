import { useState } from "react";
import { validateEmail } from "../utils/validation";
import { loginUser } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import Layout from "../components/layout/Layout";
import { jwtDecode } from "jwt-decode";
import socket from "../socket";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validate inputs
        if (!email || !password) {
            alert("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            setLoading(false);
            return;
        }

        // Make API call only if all validations pass
        const response = await loginUser({ email, password });

        // Checks if the user is an admin and navigate accordingly
        if (response.success) {
            const token = response.data?.token;
            if (!token) {
                alert("Login succeeded but token is missing.");
                setLoading(false);
                return;
            }

            // Set token in localStorage
            localStorage.setItem("token", token);

            try {
                const decodedToken = jwtDecode(token);
                const isAdmin = decodedToken?.isAdmin;
                socket.auth.token = token;
                if (isAdmin) {
                    socket.connect();
                    navigate("/mainPageAdmin");
                } else {
                    socket.connect();
                    navigate("/mainPageUser");
                }
            } catch (error) {
                console.error("Token decoding failed:", error);
                alert("Login succeeded but role detection failed.");
            }
        } else {
            alert(response.message);
        }

        setLoading(false);
    };

    return (
        <Layout>
            <div className='text-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-800'>Login</h2>
                <p className='mt-2 text-gray-600'>Welcome to JaMoveo!</p>
            </div>
            <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
            />
            {loading && (
                <div className='mt-4 text-center text-gray-500'>Loading...</div>
            )}
            <div className='mt-4 text-center'>
                <p className='text-gray-600'>
                    Don't have an account yet?{" "}
                    <Link
                        to='/register'
                        className='text-blue-500 hover:underline'
                    >
                        Register here
                    </Link>
                </p>
            </div>
        </Layout>
    );
}

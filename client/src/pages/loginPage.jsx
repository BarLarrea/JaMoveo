import { useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../utils/validation";
import { loginUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import Layout from "../components/layout/Layout";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {}, [email, password]);

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

        if (response.success) {
            navigate("/maimPage");
        } else {
            alert(response.message);
        }

        setLoading(false);
    };

    return (
        <Layout>
            <div className='text-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-800'>Login</h2>
                <p className='mt-2 text-gray-600'>Welcom to JaMoveo!</p>
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
                    <a
                        href='/register'
                        className='text-blue-500 hover:underline'
                    >
                        Register here
                    </a>
                </p>
            </div>
        </Layout>
    );
}

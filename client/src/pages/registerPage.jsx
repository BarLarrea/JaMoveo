import { useLocation } from "react-router-dom";
import { useState } from "react";
import { validateRegisterForm } from "../utils/validation";
import { registerUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import Spinner from "../components/ui/Spinner";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        bandRole: null,
        instrument: "",
        email: "",
        password: "",
        adminCode: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Check if the user is registering as an admin
    // It dosent say the user is a valid-admin and it will be checked in the backend with a spacial adminCode
    const isAdmin = location.pathname.includes("/admin");

    const handleChange = (field) => (value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Make API call only if all validations pass
        const error = validateRegisterForm({ ...formData, isAdmin });
        if (error) {
            alert(error);
            setLoading(false);
            return;
        }

        // API call to register
        const response = await registerUser({ ...formData, isAdmin });

        if (response?.success) {
            alert("Registration successful!");
            navigate("/login");
        } else {
            alert(response?.message || "Registration failed.");
        }

        setLoading(false);
    };

    if (loading) {
        return (
            <Layout>
                <Spinner message='Registering...' />
            </Layout>
        );
    }

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
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
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

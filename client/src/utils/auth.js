import axios from "axios";

export const registerUser = async ({
    firstName,
    lastName,
    isSinger,
    instrument,
    email,
    password
}) => {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/auth/register",
            {
                firstName,
                lastName,
                isSinger,
                instrument,
                email,
                password
            }
        );

        if (response.status === 201) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: response.data.message };
        }
    } catch (error) {
        console.error("Registration error:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Something went wrong"
        };
    }
};

import axios from "axios";
import { renderBackendURL, loginApiUrl } from "../constants/urls.js";

export const registerUser = async (userData) => {
    const {
        firstName,
        lastName,
        bandRole,
        instrument,
        email,
        password,
        isAdmin,
        adminCode
    } = userData;

    const isAdminurl = isAdmin
        ? "/api/auth/register/admin"
        : "/api/auth/register";

    try {
        const response = await axios.post(`${renderBackendURL}${isAdminurl}`, {
            firstName,
            lastName,
            bandRole,
            instrument,
            email,
            password,
            isAdmin,
            adminCode: isAdmin ? adminCode : undefined // Only include adminCode if registering from admin URL
        });

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

export const loginUser = async ({ email, password }) => {
    try {
        const response = await axios.post(`${renderBackendURL}${loginApiUrl}`, {
            email,
            password
        });

        if (response.status === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: response.data.message };
        }
    } catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Something went wrong"
        };
    }
};

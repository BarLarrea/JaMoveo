import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/jwt.js";

const emailRegex = /^\S+@\S+\.\S+$/;

export const registerUser = async (req, res) => {
    const {
        firstName,
        lastName,
        isAdmin,
        isSinger,
        instrument,
        email,
        password
    } = req.body;

    // Basic presence check
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Normalize and validate email
    const normalizedEmail = email.toLowerCase();
    if (!emailRegex.test(normalizedEmail)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
    }

    // Password strength check
    if (password.length < 8) {
        return res
            .status(400)
            .json({ message: "Password must be at least 8 characters long" });
    }

    // Instrument required for non-singers
    if (!isSinger && !instrument) {
        return res
            .status(400)
            .json({ message: "Instrument is required for non-singers" });
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            firstName,
            lastName,
            isAdmin: Boolean(isAdmin),
            isSinger: Boolean(isSinger),
            instrument: isSinger ? null : instrument,
            email: normalizedEmail,
            password: hashedPassword
        });

        const token = generateAccessToken(newUser);

        const savedUser = await newUser.save();

        // Respond
        res.status(201).json({
            message: "User registered successfully",
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                isAdmin: savedUser.isAdmin,
                isSinger: savedUser.isSinger,
                instrument: savedUser.instrument,
                email: savedUser.email
            },
            token
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message: "Error registering user",
            error: error.message || error
        });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Basic presence check
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email and password are required" });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    const normalizedEmail = email.toLowerCase();

    try {
        // Find user by email
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res
                .status(404)
                .json({ message: "Email or password is incorrect" });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ message: "Email or password is incorrect" });
        }

        // Generate JWT
        const token = generateAccessToken(user);

        // Respond
        res.status(200).json({
            message: "Login successful",
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                isAdmin: user.isAdmin,
                isSinger: user.isSinger,
                instrument: user.instrument,
                email: user.email
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/jwt.js";
import { validateEmail, validatePassword } from "../utils/validation.js";

export const registerUser = async (req, res) => {
    const {
        firstName,
        lastName,
        bandRole, // 'singer' or 'player'
        instrument,
        email,
        password,
        isAdmin,
        adminCode
    } = req.body;

    console.log("isAdmin:", isAdmin);

    console.log("Admin code provided:", adminCode);
    console.log("Admin secret:", process.env.ADMIN_SECRET);

    const isAdminValid = isAdmin && adminCode === process.env.ADMIN_SECRET;
    console.log("isAdminValid:", isAdminValid);

    // Basic presence check
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Instrument required for players
    if (bandRole === "player" && !instrument) {
        return res
            .status(400)
            .json({ message: "Instrument is required for players" });
    }

    // Ensure instrument is not provided along with isSinger
    if (bandRole === "singer" && instrument) {
        return res.status(400).json({
            message: "User cannot be both a singer and an instrumentalist"
        });
    }

    // Normalize and validate email
    const normalizedEmail = email.toLowerCase();
    if (!validateEmail(normalizedEmail)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    if (isAdmin && !isAdminValid) {
        return res.status(403).json({ message: "Invalid admin code" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
    }

    // Password strength check
    if (!validatePassword(password)) {
        return res
            .status(400)
            .json({ message: "Password must be at least 8 characters long" });
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            firstName,
            lastName,
            isAdmin: isAdminValid,
            bandRole: bandRole,
            instrument: bandRole === "singer" ? null : instrument,
            email: normalizedEmail,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        // Response
        res.status(201).json({
            message: "User registered successfully",
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                isAdmin: savedUser.isAdmin,
                bandRole: savedUser.bandRole,
                instrument: savedUser.instrument,
                email: savedUser.email
            }
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

    if (!validateEmail(email)) {
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
                bandRole: user.bandRole,
                instrument: user.instrument,
                email: user.email
            },
            token
        });
    } catch (error) {
        res.status(500).json({
            message: "Error logging in",
            error: error.message || error
        });
    }
};

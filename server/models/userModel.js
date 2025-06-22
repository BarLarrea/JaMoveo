import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        isSinger: {
            type: Boolean,
            default: false,
            required: true
        },
        instrument: {
            type: String,
            required: function () {
                return !this.isSinger && !this.isAdmin; // Only required if not a singer or admin
            }
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8 // Minimum length for password
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

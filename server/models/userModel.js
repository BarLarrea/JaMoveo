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
                return !this.isSinger;
            } // Only required if not a singer
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
            minlength: 6 // Minimum length for password
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

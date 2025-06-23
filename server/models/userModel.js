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
        bandRole: {
            type: String,
            enum: ["singer", "player"],
            required: function () {
                return !this.isAdmin;
            }
        },
        instrument: {
            type: String,
            required: function () {
                return this.bandRole === "player";
            },
            default: null
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

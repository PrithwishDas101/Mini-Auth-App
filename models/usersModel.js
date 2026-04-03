const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: [true, 'Email should be unique'],
        minLength: [6, "Password must be at least 6 characters"],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        select: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        select: false,
    },
    verificationCodeValidation: {
        type: Number,
        select: false,
    },
    forgotPasswordCode: {
        type: Number,
        select: false,
    },
    forgotPasswordCodeValidation: {
        type: String,
        select: false,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
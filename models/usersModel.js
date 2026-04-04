const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: [true, 'Email should be unique'],
        minLength: [6, "Email must be at least 6 characters"],
        lowercase: true,
    },
    username: {
        type: String,
        trim: true,
        unique: [true, 'Username should be unique'],
        minLength: [3, "Username must be at least 3 characters"],
        maxLength: [30, "Username must not exceed 30 characters"],
        sparse: true,
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
        type: String,
        select: false,
    },
    forgotPasswordCodeValidation: {
        type: Number,
        select: false,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        max: 50,
        required: true,
    },
    firstName: {
        type: String,
        max: 20,
        required: true,
    },
    lastName: {
        type: String,
        max: 20,
        required: true,
    },
    list: {
        type: Array,
        default: []
    },
    likes: {
        type: Array,
        default: [],
    },
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model("users", userSchema);

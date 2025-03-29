"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getId = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("./error");
const getId = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await user_1.default.findOne({ email });
        if (!user) {
            return next((0, error_1.createError)(400, "error"));
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT);
        if (!token) {
            return next((0, error_1.createError)(400, "error"));
        }
        return res.status(200).json(token);
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.getId = getId;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = void 0;
const error_1 = require("./error");
const user_1 = __importDefault(require("../models/user"));
//validate email is exsit
const validateEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await user_1.default.findOne({ email });
        if (!user) {
            return next((0, error_1.createError)(400, "the email not exsit"));
        }
        next();
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.validateEmail = validateEmail;

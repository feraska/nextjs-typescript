"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const error_1 = require("../utils/error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//register user
const register = async (req, res, next) => {
    try {
        const { email, firstName, lastName, password } = req.body;
        if (firstName === "") {
            return next((0, error_1.createError)(400, "the first name must not be empty"));
        }
        if (lastName === "") {
            return next((0, error_1.createError)(400, "the last name must not be empty"));
        }
        if (email === "") {
            return next((0, error_1.createError)(400, "the email must not be empty"));
        }
        if (password === "") {
            return next((0, error_1.createError)(400, "the password must not be empty"));
        }
        const user = await user_1.default.findOne({ email });
        if (user) {
            return next((0, error_1.createError)(400, "the email user is exsit"));
        }
        const salt = await bcrypt_1.default.genSalt();
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        await user_1.default.create({
            email,
            firstName,
            password: hashedPassword,
            lastName
        });
        return res.status(200).json("register successfully");
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.register = register;
//login user
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (email === "") {
            return next((0, error_1.createError)(400, "the email must not to be empty"));
        }
        if (password === "") {
            return next((0, error_1.createError)(400, "the password must not to be empty"));
        }
        const user = await user_1.default.findOne({ email });
        if (!user) {
            return next((0, error_1.createError)(400, "user not found"));
        }
        const isCorrectPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isCorrectPassword) {
            return next((0, error_1.createError)(400, "the password not correct"));
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT);
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        return res.status(200).json("login successfully");
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.login = login;
//logout user
const logout = (req, res, next) => {
    try {
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        return res.status(200).json("logout");
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.logout = logout;

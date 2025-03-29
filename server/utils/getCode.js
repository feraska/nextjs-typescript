"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCode = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("./error");
const getCode = async (req, res, next) => {
    try {
        const random = Math.floor(100000 + Math.random() * 900000).toString();
        const encCode = jsonwebtoken_1.default.sign({ code: random }, process.env.JWT);
        req.random = random;
        req.code = encCode;
        next();
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.getCode = getCode;

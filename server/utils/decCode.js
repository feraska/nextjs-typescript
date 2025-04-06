"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decCode = void 0;
const error_1 = require("./error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//decrypt the code and store in req.decCode
const decCode = async (req, res, next) => {
    try {
        const { encCode } = req.body;
        const decoded = jsonwebtoken_1.default.verify(encCode, process.env.JWT); //decrypt the code
        if (!decoded) {
            return next((0, error_1.createError)(403, "code is not valid"));
        }
        req.decCode = decoded;
        next();
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.decCode = decCode;

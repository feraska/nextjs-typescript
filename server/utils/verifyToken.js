"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("./error");
//vertify token cookies and store in req.user
const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token || req.body.id; //cookies check if login
    if (!token)
        return next((0, error_1.createError)(401, "You are not authenticated!"));
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT); //decrypt the token
    if (!decoded) {
        return next((0, error_1.createError)(403, "Token is not valid!"));
    }
    req.user = decoded;
    next();
};
exports.verifyToken = verifyToken;

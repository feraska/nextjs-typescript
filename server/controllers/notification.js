"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNotification = exports.getAllNotification = void 0;
const notification_1 = __importDefault(require("../models/notification"));
const error_1 = require("../utils/error");
const user_1 = __importDefault(require("../models/user"));
//get all notification
const getAllNotification = async (req, res, next) => {
    try {
        const message = await notification_1.default.find().sort({ updatedAt: -1 });
        return res.status(200).json(message);
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.getAllNotification = getAllNotification;
//add notification
const addNotification = async (req, res, next) => {
    try {
        const { msg } = req.body;
        const user = await user_1.default.findById(req.user?.id);
        if (!user) {
            return next((0, error_1.createError)(400, "not have authorization"));
        }
        if (!user.isAdmin) {
            return next((0, error_1.createError)(400, "not have authorization"));
        }
        await notification_1.default.create({
            msg: msg,
        });
        return res.status(200).json("Message added successfully");
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.addNotification = addNotification;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNotification = exports.getAllNotification = void 0;
const notification_1 = __importDefault(require("../models/notification"));
const error_1 = require("../utils/error");
const getAllNotification = async (req, res, next) => {
    try {
        const message = await notification_1.default.find({
            users: {
                $all: [req.user?.id]
            }
        }).sort({ updatedAt: 1 });
        // const projectMessages = message.map((msg) => {
        //     return {
        //         fromSelf:msg.sender.toString() === from,
        //         message:msg.message.text
        //     }
        // })
        return res.status(200).json(message);
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.getAllNotification = getAllNotification;
const addNotification = async (req, res, next) => {
    try {
        const { from, to, msg } = req.body;
        const data = await notification_1.default.create({
            msg: msg,
            users: [from, to],
            sender: from
        });
        if (data) {
            return res.json({ msg: "Message added successfully" });
        }
        return res.json({ msg: "Failed to add message to database" });
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.addNotification = addNotification;

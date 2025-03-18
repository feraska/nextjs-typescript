"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unreadEmpty = exports.unreadInc = exports.removeFromLikes = exports.addToLikes = exports.removeFromList = exports.addToList = exports.getUser = void 0;
const error_1 = require("../utils/error");
const user_1 = __importDefault(require("../models/user"));
const getUser = async (req, res, next) => {
    try {
        const user = await user_1.default.findById(req.user?.id).select("-password");
        return res.status(200).json(user);
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.getUser = getUser;
const addToList = async (req, res, next) => {
    try {
        await user_1.default.findByIdAndUpdate(req.user?.id, {
            $addToSet: {
                list: +req.body.image
            }
        });
        return res.status(200).json("add to list");
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.addToList = addToList;
const removeFromList = async (req, res, next) => {
    try {
        await user_1.default.findByIdAndUpdate(req.user?.id, {
            $pull: {
                list: +req.body.image
            }
        });
        return res.status(200).json("remove list");
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.removeFromList = removeFromList;
const addToLikes = async (req, res, next) => {
    try {
        await user_1.default.findByIdAndUpdate(req.user?.id, {
            $addToSet: {
                likes: +req.body.image
            }
        });
        return res.status(200).json("add to list");
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.addToLikes = addToLikes;
const removeFromLikes = async (req, res, next) => {
    try {
        await user_1.default.findByIdAndUpdate(req.user?.id, {
            $pull: {
                likes: +req.body.image
            }
        });
        return res.status(200).json("remove list");
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.removeFromLikes = removeFromLikes;
const unreadInc = async (req, res, next) => {
    try {
        await user_1.default.findByIdAndUpdate(req.user?.id, {
            $inc: { unread: 1 }
        }, // If "score" does not exist, it will be created and set to 1
        { new: true });
        return res.status(200).json("unread inc");
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.unreadInc = unreadInc;
const unreadEmpty = async (req, res, next) => {
    try {
        await user_1.default.findByIdAndUpdate(req.user?.id, { unread: 0 }, { new: true });
        return res.status(200).json("unread inc");
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.unreadEmpty = unreadEmpty;

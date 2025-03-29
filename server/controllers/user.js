"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.validateCode = exports.sendEmail = exports.editProfile = exports.editPassword = exports.unreadEmpty = exports.unreadInc = exports.removeFromLikes = exports.addToLikes = exports.removeFromList = exports.addToList = exports.getUser = void 0;
const error_1 = require("../utils/error");
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const nodemailer_1 = __importDefault(require("nodemailer"));
//get user by id 
const getUser = async (req, res, next) => {
    try {
        const user = await user_1.default.findById(req.user?.id).select("-password");
        if (!user) {
            return next((0, error_1.createError)(400, "user not exsit"));
        }
        return res.status(200).json(user);
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.getUser = getUser;
//add to my list user
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
//remove from my list user
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
//like movie by user
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
//disike movie by user
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
//increment 1 unread notification
const unreadInc = async (req, res, next) => {
    try {
        await user_1.default.findByIdAndUpdate(req.user?.id, {
            $inc: { unread: 1 }
        }, // If "unread" does not exist, it will be created and set to 1
        { new: true });
        return res.status(200).json("unread inc");
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.unreadInc = unreadInc;
//update unread notifiaction to be 0
const unreadEmpty = async (req, res, next) => {
    try {
        await user_1.default.findByIdAndUpdate(req.user?.id, { unread: 0 }, { new: true });
        return res.status(200).json("unread empty");
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.unreadEmpty = unreadEmpty;
//edit password
const editPassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword, rePassword } = req.body;
        if (currentPassword === "") {
            return next((0, error_1.createError)(400, "the current password must not be empty"));
        }
        if (newPassword === "") {
            return next((0, error_1.createError)(400, "the current new password must not be empty"));
        }
        if (rePassword === "") {
            return next((0, error_1.createError)(400, "the current re-password must not be empty"));
        }
        if (newPassword !== rePassword) {
            return next((0, error_1.createError)(400, "the new password and re-password must be equal"));
        }
        const user = await user_1.default.findById(req.user?.id);
        const salt = await bcrypt_1.default.genSalt();
        const hashedPassword = await bcrypt_1.default.hash(newPassword, salt);
        if (!user) {
            return next((0, error_1.createError)(400, "error not be user"));
        }
        const isCorrectPassword = await bcrypt_1.default.compare(currentPassword, user.password);
        if (!isCorrectPassword) {
            return next((0, error_1.createError)(400, "the current password not corrected"));
        }
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json("edit password successfully");
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.editPassword = editPassword;
//edit profile
const editProfile = async (req, res, next) => {
    try {
        const { firstName, lastName } = req.body;
        const user = await user_1.default.findById(req.user?.id);
        if (!user) {
            return;
        }
        if (!req.file && !firstName && !lastName) {
            return res.json("not exsit data to update");
        }
        if (!req.file) {
            if (firstName !== "") {
                user.firstName = firstName;
            }
            if (firstName !== "") {
                user.lastName = lastName;
            }
            await user.save();
            return res.json("update without file");
        }
        if (user?.img?.public_id) {
            await cloudinary_1.default.v2.uploader.destroy(user.img.public_id);
        }
        // Upload new image to Cloudinary
        const uploadPromise = new Promise((resolve, reject) => {
            cloudinary_1.default.v2.uploader.upload_stream({ folder: 'movie' }, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (!user.img) {
                        user.img = { public_id: "", url: "" };
                    }
                    user.img.public_id = result?.public_id;
                    user.img.url = result?.secure_url;
                    resolve(result);
                }
            }).end(req.file?.buffer);
        });
        // Wait for image upload to finish before continuing
        await uploadPromise;
        if (firstName !== "") {
            user.firstName = firstName;
        }
        if (lastName !== "") {
            user.lastName = lastName;
        }
        await user.save();
        res.status(200).json("edit profile");
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.editProfile = editProfile;
//send email
const sendEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        let transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            // host: "smtp.ethereal.email",
            // port: 587,
            // secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL, // generated ethereal user
                pass: process.env.PASSWORD, // generated ethereal password
            },
        });
        const random = req.random;
        // send mail with defined transport object
        await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: email, // list of receivers
            subject: "change password", // Subject line
            text: "code", // plain text body
            html: `<h1>${random}</h1>`, // html body
        });
        return res.status(200).json(req.code);
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.sendEmail = sendEmail;
//validate code
const validateCode = async (req, res, next) => {
    try {
        const { decCode } = req.body;
        if (req.decCode?.code !== decCode) {
            return next((0, error_1.createError)(400, "code not equal"));
        }
        return next();
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.validateCode = validateCode;
//forgot password
const forgotPassword = async (req, res, next) => {
    try {
        const { newPassword, rePassword } = req.body;
        if (newPassword !== rePassword) {
            return next((0, error_1.createError)(500, "the new password and re-type password not equal"));
        }
        const user = await user_1.default.findById(req.user?.id);
        if (!user) {
            return next((0, error_1.createError)(400, "user not exsit"));
        }
        const salt = await bcrypt_1.default.genSalt();
        const hashedPassword = await bcrypt_1.default.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json("forgot password successfully");
    }
    catch (err) {
        return next((0, error_1.createError)(500, err.message));
    }
};
exports.forgotPassword = forgotPassword;

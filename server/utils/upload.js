"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingle = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
// Set up multer upload
const upload = (0, multer_1.default)({ storage: storage });
//store file in req.files.file
const uploadSingle = (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(400).json(`error uploading file${err}`);
        }
        next();
    });
};
exports.uploadSingle = uploadSingle;

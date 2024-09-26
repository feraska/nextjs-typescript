"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_1 = require("../controllers/notification");
const verifyToken_1 = require("../utils/verifyToken");
const api_1 = require("../enums/api");
const router = express_1.default.Router();
router.get(api_1.api.getNotification, verifyToken_1.verifyToken, notification_1.getAllNotification);
router.post(api_1.api.addNotification, verifyToken_1.verifyToken, notification_1.addNotification);
exports.default = router;

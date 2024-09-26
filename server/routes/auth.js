"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const api_1 = require("../enums/api");
const router = express_1.default.Router();
router.post(api_1.api.login, auth_1.login);
router.post(api_1.api.register, auth_1.register);
router.delete(api_1.api.logout, auth_1.logout);
exports.default = router;

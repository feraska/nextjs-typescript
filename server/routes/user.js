"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("../enums/api");
const user_1 = require("../controllers/user");
const verifyToken_1 = require("../utils/verifyToken");
const router = express_1.default.Router();
router.get(api_1.api.findUser, verifyToken_1.verifyToken, user_1.getUser);
router.put(api_1.api.addTolist, verifyToken_1.verifyToken, user_1.addToList);
router.put(api_1.api.removeFromList, verifyToken_1.verifyToken, user_1.removeFromList);
router.put(api_1.api.likes, verifyToken_1.verifyToken, user_1.addToLikes);
router.put(api_1.api.dislike, verifyToken_1.verifyToken, user_1.removeFromLikes);
router.put(api_1.api.incUnread, verifyToken_1.verifyToken, user_1.unreadInc);
router.put(api_1.api.emptyUnread, verifyToken_1.verifyToken, user_1.unreadEmpty);
exports.default = router;

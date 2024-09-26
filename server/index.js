"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const notification_1 = __importDefault(require("./routes/notification"));
const body_parser_1 = __importDefault(require("body-parser"));
const api_1 = require("./enums/api");
dotenv_1.default.config();
const app = (0, express_1.default)();
const connectToDataBase = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URL);
        console.log("connection successfully");
    }
    catch (err) {
        console.log(err.message);
    }
};
connectToDataBase();
const corsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
    credentials: true, // Enable credentials (cookies, authorization headers, etc)
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(api_1.api.auth, auth_1.default);
app.use(api_1.api.user, user_1.default);
app.use(api_1.api.notification, notification_1.default);
//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});
app.listen(Number(process.env.PORT), () => {
    console.log(`the server run in port ${process.env.PORT}`);
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
const createError = (status, message) => {
    const err = {
        status,
        message
    };
    return err;
};
exports.createError = createError;
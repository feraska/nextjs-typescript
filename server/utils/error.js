"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
/**
 * @param status error status
 * @param message error message
 * @returns error object
 *
 */
const createError = (status, message) => {
    const err = {
        status,
        message
    };
    return err;
};
exports.createError = createError;

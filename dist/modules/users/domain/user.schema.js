"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    password: {
        type: String,
        require: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
});
exports.default = (0, mongoose_1.model)("User", userSchema);

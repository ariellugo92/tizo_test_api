"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    code: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    category: {
        type: Object,
        default: true,
    },
    unitMeasurement: {
        type: String,
        default: 'Lbs',
    },
    minQuantity: {
        type: Number,
        default: 0,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        default: 0,
    },
    status: {
        type: Boolean,
        default: true,
    }
});
exports.default = (0, mongoose_1.model)("Product", productSchema);

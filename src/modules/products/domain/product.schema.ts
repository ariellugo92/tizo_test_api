import { Schema, model } from "mongoose";
import { ProductModel } from "./product.model";

const productSchema: Schema = new Schema(
    {
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
    }
);

export default model<ProductModel>("Product", productSchema);
import { Schema, model } from "mongoose";
import { CategoryModel } from "./category.model";

const categorySchema: Schema = new Schema(
    {
        name: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        status: {
            type: Boolean,
            default: true,
        }
    }
);

export default model<CategoryModel>("Category", categorySchema);
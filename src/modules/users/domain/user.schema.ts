import { Schema, model } from "mongoose";
import { UserModel } from "./user.model";

const userSchema: Schema = new Schema(
    {
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
    }
);

export default model<UserModel>("User", userSchema);
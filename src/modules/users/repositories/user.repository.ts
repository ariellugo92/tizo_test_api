import { Service } from "typedi";
import userSchema from "../domain/user.schema";
import { UserModel } from "../domain/user.model";
import { UserUpdateDto } from "../dtos/user-update.dto";

@Service()
export class UserRepositoty {
    constructor() {}

    async get(): Promise<UserModel[]> {
        return await userSchema.find();
    }

    async getUserByUsername(username: string): Promise<UserModel | null> {
        return await userSchema.findOne({username});
    }

    async save(user: UserModel): Promise<void> {
        await userSchema.create(user);
    }

    async getById(id: string): Promise<UserModel | null> {
        return await userSchema.findById(id);
    }

    async update(user: UserUpdateDto, id: string): Promise<void> {
        const filter = {_id: id};
        await userSchema.findOneAndUpdate(filter, {...user});
    }

    async updateValue(id: string, {nameKey, value} : {nameKey: string, value: any}): Promise<void> {
        const filter = {_id: id};
        await userSchema.updateOne(filter, {[nameKey]: value}); 
    }
}
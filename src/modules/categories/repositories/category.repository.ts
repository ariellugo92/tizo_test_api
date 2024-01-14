import { Service } from "typedi";
import { CategoryModel } from "../domain/category.model";
import categorySchema from "../domain/category.schema";
import { CategoryDto } from "../dtos/category.dto";

@Service()
export class CategoryRepositoty {
    constructor() {}

    async get(): Promise<CategoryModel[]> {
        return await categorySchema.find();
    }

    async save(category: CategoryModel): Promise<void> {
        await categorySchema.create(category);
    }

    async getById(id: string): Promise<CategoryModel | null> {
        return await categorySchema.findById(id);
    }

    async update(category: CategoryDto, id: string): Promise<void> {
        const filter = {_id: id};
        await categorySchema.findOneAndUpdate(filter, {...category});
    }

    async updateValue(id: string, {nameKey, value} : {nameKey: string, value: any}): Promise<void> {
        const filter = {_id: id};
        await categorySchema.updateOne(filter, {[nameKey]: value}); 
    }
}
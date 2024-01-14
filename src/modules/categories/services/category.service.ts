import { Service } from "typedi";
import { CategoryRepositoty } from "../repositories/category.repository";
import { CategoryModel } from "../domain/category.model";
import { CategoryDto } from "../dtos/category.dto";

@Service()
export class CategoryService {
    constructor(
        private readonly categoryRepositoty: CategoryRepositoty,
    ) {}

    async getAll(): Promise<CategoryModel[]> {
        try {
            return await this.categoryRepositoty.get();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getById(id: string): Promise<CategoryModel | null> {
        try {
            return await this.categoryRepositoty.getById(id);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async save(data: CategoryDto): Promise<boolean> {
        const newCategory: CategoryModel = {
            name: data.name,
            description: data.description,
        };
        
        try {
            await this.categoryRepositoty.save(newCategory);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async update(data: CategoryDto, id: string): Promise<boolean> {
        try {
            await this.categoryRepositoty.update(data, id);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async delete(id: string): Promise<boolean> {
        const category = await this.categoryRepositoty.getById(id);

        if (!category) return false;

        try {
            await this.categoryRepositoty.updateValue(id, {nameKey: 'status', value: false});
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

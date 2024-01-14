import { Service } from "typedi";
import { ProductModel } from "../domain/product.model";
import productSchema from "../domain/product.schema";
import { ProductDto } from "../dtos/product.dto";

@Service()
export class ProductRepositoty {
    constructor() {}

    async get(): Promise<ProductModel[]> {
        return await productSchema.find();
    }

    async save(product: ProductModel): Promise<void> {
        await productSchema.create(product);
    }

    async getById(id: string): Promise<ProductModel | null> {
        return await productSchema.findById(id);
    }

    async update(product: ProductDto, id: string): Promise<void> {
        const filter = {_id: id};
        await productSchema.findOneAndUpdate(filter, {...product});
    }

    async updateValue(id: string, {nameKey, value} : {nameKey: string, value: any}): Promise<void> {
        const filter = {_id: id};
        await productSchema.updateOne(filter, {[nameKey]: value}); 
    }
}
import { Service } from "typedi";
import { ProductRepositoty } from "../repositories/product.repository";
import { ProductModel } from "../domain/product.model";
import { ProductDto } from "../dtos/product.dto";

@Service()
export class ProductService {
    constructor(
        private readonly productRepositoty: ProductRepositoty,
    ) {}

    async getAll(): Promise<ProductModel[]> {
        try {
            return await this.productRepositoty.get();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getById(id: string): Promise<ProductModel | null> {
        try {
            return await this.productRepositoty.getById(id);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async save(data: ProductDto): Promise<boolean> {
        const newProduct: ProductModel = {
            code: data.code,
            name: data.name,
            description: data.description,
            category: data.category,
            unitMeasurement: data.unitMeasurement,
            minQuantity: data.minQuantity,
            quantity: data.quantity,
            price: data.price,
        };
        
        try {
            await this.productRepositoty.save(newProduct);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async update(data: ProductDto, id: string): Promise<boolean> {
        try {
            await this.productRepositoty.update(data, id);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async delete(id: string): Promise<boolean> {
        const product = await this.productRepositoty.getById(id);

        if (!product) return false;

        try {
            await this.productRepositoty.updateValue(id, {nameKey: 'status', value: false});
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

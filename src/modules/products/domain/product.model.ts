import { CategoryModel } from "../../categories/domain/category.model";

export interface ProductModel {
    _id?: string,
    code: string,
    name: string,
    description: string,
    category: Partial<CategoryModel>,
    unitMeasurement: string,
    minQuantity: number,
    quantity: number,
    price: number,
    status?: boolean,
}
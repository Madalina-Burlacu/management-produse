import { Product } from "../models/Product";

export interface IProductInterface {
    getAllProducts(): Promise<Product[]>;
    addProduct(product: Product): Promise<void>;
    editProduct(id: string, updatedProduct: Product): Promise<void>;
    deleteProduct(id: string): Promise<void>;
}

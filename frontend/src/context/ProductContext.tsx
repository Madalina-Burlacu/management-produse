import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import ProductService from "../services/ProductService";
import { Product } from "../interface/models/Product";

interface IProductContext {
    products: Product[];
    addProduct: (product: Product) => void;
    deleteProduct: (id: string) => void;
    editProduct: (id: string, updatedProduct: Product) => void;
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const ProductContext = createContext<IProductContext | undefined>(
    undefined
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        //daca export doar clasa trebuie sa creez o instanta manual astfel:
        //const productService = new ProductService();
        // productService.getAllProducts();
        const data = await ProductService.getAllProducts();
        setProducts(data);
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (product: Product) => {
        await ProductService.addProduct(product);
        setProducts([...products, product]);
    };

    const deleteProduct = async (id: string) => {
        await ProductService.deleteProduct(id);
        setProducts(products.filter((product) => product.id !== id));
    };

    const editProduct = async (id: string, updatedProduct: Product) => {
        await ProductService.editProduct(id, updatedProduct);
        setProducts(
            products.map((product) =>
                product.id === id ? { ...product, ...updatedProduct } : product
            )
        );
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                addProduct,
                deleteProduct,
                editProduct,
                setProducts,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error(
            "useProductContext must be used within a ProductProvider"
        );
    }
    return context;
};

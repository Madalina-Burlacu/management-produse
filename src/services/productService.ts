import { Product } from "../interface/models/Product";
import axios from "axios";

const API_URL = "http://localhost:5000/products";

const getAllProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

const getProductById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
};

const addProduct = async (product: Product) => {
    try {
        const response = await axios.post(API_URL, product);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};

const editProduct = async (id: string, updatedProduct: Product) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

const deleteProduct = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

export default {
    getAllProducts,
    getProductById,
    addProduct,
    editProduct,
    deleteProduct,
};

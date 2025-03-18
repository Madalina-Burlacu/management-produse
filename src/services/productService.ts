import { db } from "../../config/firestore";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { Product } from "../interface/models/Product";

class ProductService {
    static async getAllProducts(): Promise<Product[]> {
        const querySnapshot = await getDocs(collection(db, "products"));
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Product[];
    }
}

export default ProductService;

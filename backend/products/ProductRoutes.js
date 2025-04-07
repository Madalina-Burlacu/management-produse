import express from "express";
import {
    getProducts,
    addProduct,
    editProduct,
    deleteProduct,
    getProduct,
} from "./ProductController.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.post("/products", addProduct);
router.put("/products/:id", editProduct);
router.delete("/products/:id", deleteProduct);

export default router;

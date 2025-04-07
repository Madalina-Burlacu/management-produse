import admin from "firebase-admin";
import dotenv from "dotenv";
import { ProductSchema } from "./ProductSchema.js";
import { ProductSchemaEdit } from "./ProductSchemaEdit.js";

dotenv.config();

//connect to firebase

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
});

const db = admin.firestore();

export const getProducts = async (req, res) => {
    try {
        const productsSnapshot = await db.collection("products").get();
        const products = productsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        res.json(products);
    } catch (error) {
        console.error("Error getting products:", error);
        res.status(500).json({ error: "Error getting products." });
    }
};

export const getProduct = async (req, res) => {
    try {
        const docRef = db.collection("products").doc(req.params.id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return res.status(404).json({ error: "Product not found." });
        }

        res.json({ id: docSnap.id, ...docSnap.data() });
    } catch (error) {
        res.status(500).json({ error: "Error getting product." });
    }
};

export const addProduct = async (req, res) => {
    try {
        await ProductSchema.validate(req.body, { abortEarly: false });
        const newProduct = req.body;
        const docRef = await db.collection("products").add(newProduct);
        res.status(201).json({ id: docRef.id, ...newProduct });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                error: "Invalid product data",
                details: error.errors,
            });
        }
        res.status(500).json({ error: `Error adding product ${error}.` });
    }
};

export const editProduct = async (req, res) => {
    try {
        // await ProductSchema.validate(req.body, { abortEarly: false });
        // const updatedProduct = req.body;
        const docRef = await db.collection("products").doc(req.params.id).get();
        if (!docRef.exists) {
            return res.status(404).json({ error: "Product not found." });
        }

        const existingProduct = docRef.data();
        const updatedProduct = { ...existingProduct, ...req.body };

        const validFields = {};
        for (const key in req.body) {
            validFields[key] = req.body[key];
        }

        await ProductSchemaEdit.validate(req.body, { abortEarly: false });

        await db.collection("products").doc(req.params.id).set(updatedProduct);

        res.json({ id: req.params.id, ...updatedProduct });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                error: "Invalid product data",
                details: error.errors,
            });
        }
        res.status(500).json({
            error: "Error updating product.",
            details: error.message || error.toString(),
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await db.collection("products").doc(req.params.id).delete();
        res.json({
            success: true,
            message: `The product with the id: ${req.params.id} was deleted.`,
        });
    } catch (error) {
        res.status(500).json({ error: "Error deleting product" });
    }
};

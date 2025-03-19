import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//connect to firebase
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
});

const db = admin.firestore();

app.get("/products", async (req, res) => {
    try {
        const productsSnapshot = await db.collection("products").get();
        const products = productsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error getting products." });
    }
});

app.get("/products/:id", async (req, res) => {
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
});

app.post("/products", async (req, res) => {
    try {
        const newProduct = req.body;
        const docRef = await db.collection("products").add(newProduct);
        res.status(201).json({ id: docRef.id, ...newProduct });
    } catch (error) {
        res.status(500).json({ error: "Error adding product." });
    }
});

app.put("/products/:id", async (req, res) => {
    try {
        const updatedProduct = req.body;
        await db.collection("products").doc(req.params.id).set(updatedProduct);
        res.json({ id: req.params.id, ...updatedProduct });
    } catch (error) {
        res.status(500).json({ error: "Error updating product." });
    }
});

app.delete("/products/:id", async (req, res) => {
    try {
        await db.collection("products").doc(req.params.id).delete();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Error deleting product" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

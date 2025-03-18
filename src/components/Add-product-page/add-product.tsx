import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../../../config/firestore";

const AddProduct = () => {
    const addProductSchema = Yup.object({
        productName: Yup.string()
            .required("Name is required.")
            .matches(/^(|.{3,})$/, "Name must have at least 3 characters."),
        units: Yup.number()
            .integer("Units must be an integer number.")
            .required("Units is required."),
        price: Yup.number()
            .required("Price is required.")
            .positive("Price must be a prositive number."),
        imgFile: Yup.string(),
    });

    return (
        <form className="add-product-form">
            <div>
                <label>Product Name: </label>
                <input
                    type="text"
                    name="productName"
                    placeholder="Enter the product name"
                />
            </div>
            <div>
                <label>Units: </label>
                <input
                    type="number"
                    name="units"
                    placeholder="Enter the number of units"
                />
            </div>
            <div>
                <label>Price: </label>
                <input
                    type="number"
                    name="price"
                    placeholder="Enter the price for an unit."
                />
            </div>
            <div>
                <label>Image: </label>
                <input
                    type="text"
                    name="imgFile"
                    placeholder="Enter the image of the product."
                />
            </div>
            <button className="submitButton" type="submit">
                Save Product
            </button>
        </form>
    );
};

export default AddProduct;

import Yup from "yup";

export const ProductSchema = Yup.object({
    productName: Yup.string()
        .required("Name is required")
        .matches(/^(|.{3,})$/, "Product name must have at least 3 characters."),
    units: Yup.number()
        .integer("Units must be an integer number.")
        .positive("The number of unit must be positive.")
        .required("Units is required."),
    price: Yup.number()
        .required("Price is required.")
        .positive("Price must be a positive number."),
    imgFile: Yup.string()
        .url("Image must be an valid url.")
        .required("Imahe is required"),
});

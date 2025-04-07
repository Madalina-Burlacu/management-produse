import Yup from "yup";

export const ProductSchemaEdit = Yup.object({
    productName: Yup.string().matches(
        /^(|.{3,})$/,
        "Product name must have at least 3 characters."
    ),
    units: Yup.number()
        .integer("Units must be an integer number.")
        .positive("The number of unit must be positive."),
    price: Yup.number().positive("Price must be a positive number."),
    imgFile: Yup.string().url("Image must be an valid url."),
});

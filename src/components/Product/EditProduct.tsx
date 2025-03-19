import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../../interface/models/Product";
import ProductService from "../../services/ProductService";
import { useEffect, useState } from "react";

//schema with Yup
const editProductSchema = Yup.object({
    productName: Yup.string()
        .required("Name is required.")
        .matches(/^(|.{3,})$/, "Name must have at least 3 characters."),
    units: Yup.number()
        .integer("Units must be an integer number.")
        .positive("The number of units must be positive.")
        .required("Units is required."),
    price: Yup.number()
        .required("Price is required.")
        .positive("Price must be a positive number."),
    imgFile: Yup.string()
        .url("Image must be a valid url.")
        .required("Image is required."),
});

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    // Preluare detalii produs pentru editare
    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                try {
                    const currentProduct = await ProductService.getProductById(
                        id
                    );
                    if (currentProduct) {
                        setProduct(currentProduct);
                    }
                } catch (error) {
                    console.error("Error fetching product:", error);
                }
            }
        };
        fetchProduct();
    }, [id]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<Product>({
        resolver: yupResolver(editProductSchema),
    });

    // Setează valorile implicite ale formularului
    useEffect(() => {
        if (product) {
            setValue("productName", product.productName);
            setValue("units", product.units);
            setValue("price", product.price);
            setValue("imgFile", product.imgFile);
        }
    }, [product, setValue]);

    const editProduct = async (updatedProduct: Product) => {
        try {
            console.log(id);
            if (id) {
                const response = await ProductService.editProduct(
                    id,
                    updatedProduct
                );
                console.log("Response from server:", response);
                navigate("/products-list");
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    if (!product) return <Typography>Loading...</Typography>;

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Edit Product
            </Typography>
            <form onSubmit={handleSubmit(editProduct)}>
                <Box mb={2}>
                    <Typography sx={{ paddingBottom: "10px" }}>
                        Product Name:{" "}
                    </Typography>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Required"
                        variant="outlined"
                        {...register("productName")}
                        error={!!errors.productName}
                        helperText={errors.productName?.message}
                    />
                </Box>
                <Box mb={2}>
                    <Typography sx={{ paddingBottom: "10px" }}>
                        Units:{" "}
                    </Typography>
                    <TextField
                        fullWidth
                        type="number"
                        {...register("units")}
                        error={!!errors.units}
                        helperText={errors.units?.message}
                    />
                </Box>
                <Box mb={2}>
                    <Typography sx={{ paddingBottom: "10px" }}>
                        Price:{" "}
                    </Typography>
                    <TextField
                        fullWidth
                        type="number"
                        {...register("price")}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                    />
                </Box>
                <Box mb={2}>
                    <Typography sx={{ paddingBottom: "10px" }}>
                        Image:{" "}
                    </Typography>
                    <TextField
                        fullWidth
                        type="text"
                        {...register("imgFile")}
                        error={!!errors.imgFile}
                        helperText={errors.imgFile?.message}
                    />
                </Box>
                <Button variant="contained" color="primary" type="submit">
                    Save Changes
                </Button>
            </form>
        </Container>
    );
};

export default EditProduct;

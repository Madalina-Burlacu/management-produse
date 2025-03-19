import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Product } from "../../interface/models/Product";
import ProductService from "../../services/ProductService";

const addProductSchema = Yup.object({
    productName: Yup.string()
        .required("Name is required.")
        .matches(/^(|.{3,})$/, "Name must have at least 3 characters."),
    units: Yup.number()
        .integer("Units must be an integer number.")
        .positive("The number of unit be positive.")
        .required("Units is required."),
    price: Yup.number()
        .required("Price is required.")
        .positive("Price must be a positive number."),
    imgFile: Yup.string()
        .url("Image must be an valid url.")
        .required("Image is required"),
});

const AddProduct = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Product>({
        resolver: yupResolver(addProductSchema),
    });
    const addProduct = async (product: Product) => {
        try {
            await ProductService.addProduct(product);
            navigate("/products-list");
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Add New Product
            </Typography>
            <form
                className="add-product-form"
                onSubmit={handleSubmit(addProduct)}
            >
                <Box mb={2}>
                    <Typography sx={{ paddingBottom: "10px" }}>
                        Product Name:{" "}
                    </Typography>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Required"
                        variant="outlined"
                        type="text"
                        placeholder="Enter the product name"
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
                        id="outlined-basic"
                        label="Required"
                        variant="outlined"
                        type="number"
                        placeholder="Enter the number of units."
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
                        id="outlined-basic"
                        label="Required"
                        variant="outlined"
                        type="number"
                        placeholder="Enter the price for an unit."
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
                        id="outlined-basic"
                        label="Required"
                        variant="outlined"
                        type="text"
                        placeholder="Enter the URL of the image."
                        {...register("imgFile")}
                        error={!!errors.imgFile}
                        helperText={errors.imgFile?.message}
                    />
                    {/* incercare cu upload img // necesar acces storage Firebase */}
                    {/* <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload files
                        <HiddenInput
                            type="file"
                            accept="image/*"
                            {...register("imgFile", {
                                required: "Please upload an image.",
                            })}
                        />
                    </Button>
                    {errors.imgFile && (
                        <Typography
                            color="error"
                            variant="body2"
                            sx={{ marginTop: 1 }}
                        >
                            {errors.imgFile.message}
                        </Typography>
                    )} */}
                </Box>

                {/* <button className="submitButton" type="submit">
                Save Product
            </button> */}
                <Button
                    variant="contained"
                    color="primary"
                    className="submit-button"
                    type="submit"
                >
                    Save Product
                </Button>
            </form>
        </Container>
    );
};

export default AddProduct;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";

const DeleteProduct = ({ id }: { id: string }) => {
    const { deleteProduct } = useProductContext();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = () => {
        deleteProduct(id);
        setOpen(false);
        navigate("/products-list");

        return (
            <>
                <Button color="error" onClick={handleClickOpen}>
                    Delete
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this product?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    };
};

export default DeleteProduct;

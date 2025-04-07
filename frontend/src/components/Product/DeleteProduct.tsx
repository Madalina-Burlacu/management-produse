import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";

// delete product
const DeleteProduct = ({
    id,
    open,
    handleClose,
}: {
    id: string;
    open: boolean;
    handleClose: () => void;
}) => {
    const { deleteProduct } = useProductContext();
    // const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    // const handleClickOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    const handleDelete = () => {
        deleteProduct(id);
        handleClose();
        // setOpen(false);
        // navigate("/products-list");
    };

    return (
        <>
            {/* <Button color="error" onClick={handleClickOpen}>
                Delete
            </Button> */}
            <Dialog open={open}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this product?
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>
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

export default DeleteProduct;

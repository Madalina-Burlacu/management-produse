import { useProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { Button, Paper, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";

const ProductsList = () => {
    const { products, deleteProduct, setProducts } = useProductContext();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await ProductService.getAllProducts();
            setProducts(data);
        };
        fetchProducts();
    });

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", headerAlign: "center", flex: 1 },
        {
            field: "name",
            headerName: "Product Name",
            headerAlign: "center",
            flex: 1,
        },
        {
            field: "units",
            headerName: "Product Units",
            flex: 1,
            type: "number",
            headerAlign: "center",
        },
        {
            field: "price",
            headerName: "Product Price",
            flex: 1,
            type: "number",
            headerAlign: "center",
        },
        {
            field: "value",
            headerName: "Value",
            flex: 1,
            type: "number",
            headerAlign: "center",
        },
        {
            field: "imgFile",
            headerName: "Image Link",
            flex: 1,
            headerAlign: "center",
        },
        {
            field: "actions",
            headerName: "Actions",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params: any) => (
                <>
                    <Button
                        onClick={() => navigate(`/edit/${params.row.id}`)}
                        color="primary"
                        size="small"
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => deleteProduct(params.row.id)}
                        color="error"
                        size="small"
                        style={{ marginLeft: "10px" }}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];
    const rows = products.map((product) => ({
        id: product.id,
        name: product.productName,
        units: product.units,
        price: product.price,
        value: product.units * product.price,
        imgFile: product.imgFile,
    }));

    //filter by all fields:
    // const filteredRows = rows.filter((row) =>
    //     Object.values(row).some((value: any) =>
    //         value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    //     )
    // );

    //filter by name and price
    const filteredRows = rows.filter((row) => {
        const nameMatches = row.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const priceMatches = row.price.toString().includes(searchQuery);
        return nameMatches || priceMatches;
    });

    return (
        <Paper sx={{ height: "auto", width: "100%" }}>
            <TextField
                label="Search"
                variant="standard"
                fullWidth
                sx={{ marginBottom: 2, width: "20%", marginLeft: "3%" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <DataGrid
                rows={filteredRows}
                columns={columns}
                pagination
                paginationModel={{
                    pageSize: 20,
                    page: 0,
                }}
                pageSizeOptions={[20, 25]}
                // checkboxSelection
                sx={{ border: 0 }}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 20, page: 0 },
                    },
                }}
            />
        </Paper>
    );
};

export default ProductsList;

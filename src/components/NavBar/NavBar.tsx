import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Stack,
    Button,
} from "@mui/material";
import { LaptopMacOutlined } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const NavBar = () => {
    const location = useLocation(); // Get the current route from useLocation
    const isAddProductPage = location.pathname === "/add-product";
    const isProductsListPage = location.pathname === "/products-list";

    return (
        <AppBar
            position="static"
            sx={{ bgcolor: "black", marginBottom: "20px" }}
        >
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="logo"
                    // href="/"
                    component={RouterLink}
                    to="/"
                >
                    <LaptopMacOutlined />
                </IconButton>
                <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    sx={{ flexGrow: 1, color: "white", textDecoration: "none" }}
                >
                    Product App
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button
                        color="inherit"
                        // href="/add-product"
                        component={RouterLink}
                        to="/add-product"
                        sx={{
                            border: isAddProductPage
                                ? "solid 1px white"
                                : "none",
                            "&:hover": {
                                backgroundColor: "lightgrey",
                                color: "black",
                            },
                            // "&:active": {
                            //     backgroundColor: "primary.main",
                            //     transform: "scale(0.95)",
                            // border: "solid 1px white",
                            // },
                        }}
                    >
                        Add Product
                    </Button>
                    <Button
                        color="inherit"
                        // href="/products-list"
                        component={RouterLink}
                        to="/products-list"
                        sx={{
                            border: isProductsListPage
                                ? "solid 1px white"
                                : "none",

                            "&:hover": {
                                backgroundColor: "lightgrey",
                                color: "black",
                            },
                        }}
                    >
                        Products List
                    </Button>
                    <Button
                        color="inherit"
                        href="#"
                        sx={{
                            "&:hover": {
                                backgroundColor: "lightgrey",
                                color: "black",
                            },
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        color="inherit"
                        href="#"
                        sx={{
                            "&:hover": {
                                backgroundColor: "lightgrey",
                                color: "black",
                            },
                        }}
                    >
                        Sign in
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;

import "./App.css";
import AddProduct from "./components/Product/AddProduct";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProductsList from "./components/Product/ProductsList";
import { ProductProvider } from "./context/ProductContext";
import NavBar from "./components/NavBar/NavBar";
import EditProduct from "./components/Product/EditProduct";

function App() {
    const navigate = useNavigate();
    return (
        <ProductProvider>
            <NavBar />
            <Routes>
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/products-list" element={<ProductsList />} />
                <Route path="/edit/:id" element={<EditProduct />} />
            </Routes>
        </ProductProvider>
    );
}

export default App;

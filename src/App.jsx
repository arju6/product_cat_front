import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Pnf from "./pages/Pnf";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />
      <Route path="*" element={<Pnf />} />
    </Routes>
  );
}

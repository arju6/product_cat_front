import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { createProduct } from "../services/api";
import { useState } from "react";

export default function AddProduct() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);

      await createProduct(values);

      // Go back to ProductList
      navigate("/");
    } catch {
      window.alert("Could not add the product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="form-page">
      <div className="page-heading compact">
        <div>
          <p className="eyebrow">Catalog</p>

          <h1>Add Product</h1>

          <p className="page-subtitle">Add a new product to your catalog.</p>
        </div>
      </div>

      <ProductForm onSubmit={handleSubmit} submitting={submitting} mode="add" />
    </section>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { getProduct, updateProduct } from "../services/api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch {
        setError("Product not found. It may have been deleted.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);

      await updateProduct(id, {
        id: product.id,
        ...values,
      });

      // Go back to ProductList after saving
      navigate("/");
    } catch {
      window.alert("Could not update the product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="state page-state">
        <div className="spinner" />
        Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="state page-state">
        <strong>{error}</strong>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <section className="form-page">
      <div className="page-heading compact">
        <div>
          <p className="eyebrow">Catalog</p>

          <h1>Edit Product</h1>

          <p className="page-subtitle">
            Update the details for {product.name}.
          </p>
        </div>
      </div>

      <ProductForm
        initialValues={{
          name: product.name,
          price: product.price,
          category: product.category,
        }}
        onSubmit={handleSubmit}
        submitting={submitting}
        mode="edit"
      />
    </section>
  );
}

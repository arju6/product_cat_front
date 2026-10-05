import { useEffect, useState } from "react";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { Link } from "react-router-dom";

const emptyProduct = { name: "", price: "", category: "" };

export default function ProductForm({
  initialValues = emptyProduct,
  onSubmit,
  submitting = false,
  mode = "add",
}) {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Product name is required.";
    if (!form.category.trim()) nextErrors.category = "Category is required.";
    if (form.price === "" || Number(form.price) <= 0)
      nextErrors.price = "Enter a valid price greater than 0.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    await onSubmit({
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category.trim(),
    });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="field full-width">
          <label htmlFor="name">Product name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Wireless Headphones"
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="field">
          <label htmlFor="price">Price</label>
          <div className="input-prefix">
            <span>₹</span>
            <input
              id="price"
              name="price"
              type="number"
              min="1"
              step="1"
              value={form.price}
              onChange={handleChange}
              placeholder="0"
            />
          </div>
          {errors.price && <span className="field-error">{errors.price}</span>}
        </div>

        <div className="field">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Electronics"
          />
          {errors.category && (
            <span className="field-error">{errors.category}</span>
          )}
        </div>
      </div>

      <div className="form-actions">
        <Link to="/" className="btn btn-secondary">
          <FiArrowLeft /> Cancel
        </Link>
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          <FiSave />{" "}
          {submitting
            ? "Saving..."
            : mode === "edit"
              ? "Save Changes"
              : "Add Product"}
        </button>
      </div>
    </form>
  );
}

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FiEdit2,FiPackage,FiPlus,FiRefreshCw,FiSearch,FiTrash2,} from "react-icons/fi";
import { deleteProduct, getProducts } from "../services/api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      setProducts(await getProducts());
    } catch {
      setError(
        "Unable to load products. Make sure JSON Server is running on port 3000.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Delete “${product.name}”? This action cannot be undone.`,
    );
    if (!confirmed) return;
    try {
      await deleteProduct(product.id);
      setProducts((current) =>
        current.filter((item) => item.id !== product.id),
      );
    } catch {
      window.alert("Could not delete the product. Please try again.");
    }
  };

  const filteredProducts = products.filter((product) => {
    const query = search.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  });

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Inventory</p>
          <h1>Products</h1>
          <p className="page-subtitle">
            Manage your product catalog in one place.
          </p>
        </div>
        <Link to="/add-product" className="btn btn-primary">
          <FiPlus /> Add Product
        </Link>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <FiSearch />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or category..."
            aria-label="Search products"
          />
        </div>
        <button
          className="btn btn-secondary"
          onClick={loadProducts}
          disabled={loading}
        >
          <FiRefreshCw /> Refresh
        </button>
      </div>

      {error && <div className="alert error">{error}</div>}

      <div className="table-card">
        <div className="table-meta">
          <span>
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </span>
        </div>
        {loading ? (
          <div className="state">
            <div className="spinner" /> Loading products...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="state">
            <div className="empty-icon">
              <FiPackage />
            </div>
            <strong>No products found</strong>
            <span>
              {search
                ? "Try a different search."
                : "Add your first product to get started."}
            </span>
            {!search && (
              <button
                className="btn btn-primary"
                onClick={() => navigate("/add-product")}
              >
                <FiPlus /> Add Product
              </button>
            )}
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th className="actions-head">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-name">
                        <span className="product-avatar">
                          {product.name.charAt(0).toUpperCase()}
                        </span>
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td className="price">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </td>
                    <td>
                      <span className="category-pill">{product.category}</span>
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          className="icon-btn edit"
                          title="Edit product"
                          onClick={() =>
                            navigate(`/edit-product/${product.id}`)
                          }
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="icon-btn delete"
                          title="Delete product"
                          onClick={() => handleDelete(product)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

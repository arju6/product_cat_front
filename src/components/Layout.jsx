import { Link, NavLink, Outlet } from "react-router-dom";
import { FiPackage, FiPlus } from "react-icons/fi";

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <Link
            to="/products"
            className="brand"
            aria-label="Product Catalog home"
          >
            <span className="brand-mark">
              <FiPackage />
            </span>
            <span>Product Catalog</span>
          </Link>
          <nav className="nav-links">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Products
            </NavLink>
            <Link to="/add-product" className="btn btn-primary btn-small">
              <FiPlus /> Add Product
            </Link>
          </nav>
        </div>
      </header>
      <main className="main-content container">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container"> copyright@2026</div>
      </footer>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-vh-100 bg-dark text-white d-flex align-items-center justify-content-center text-center">
      <div className="container">
        <h1
          className="display-1 fw-bold"
          style={{
            fontSize: "clamp(150px, 25vw, 300px)",
            lineHeight: "0.8",
          }}
        >
          404
        </h1>

        <h2 className="display-5 fw-bold mt-5">Page Not Found</h2>

        <p
          className="text-secondary fs-5 mx-auto mt-3 mb-4"
          style={{ maxWidth: "600px" }}
        >
          Sorry, the page you are looking for doesn't exist, has been moved, or
          is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-light btn-lg px-5 py-3 fw-semibold">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

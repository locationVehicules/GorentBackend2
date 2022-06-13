import React from "react";

export const Logo = () => {
  return (
    <>
      <a href="index" className="d-block text-decoration-none">
        <span className="brand fs-1 mt-1 fw-bold">
          <img
            id="logo"
            src="/logo/logo w.png"
            style={{ width: "120px" }}
            alt="GoRent logo"
          />
        </span>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#side-navbar"
        aria-controls="side-navbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="bi bi-list fs-1"></i>
      </button>
    </>
  );
};

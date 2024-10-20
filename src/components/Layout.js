import React from "react";
import { Link } from "react-router-dom";

import "../styles/main.css";

const Layout = ({ children }) => (
  <>
    <nav className="navbar">
      <div className="navbar-brand mx-auto is-justify-content-center">
        <Link
          className="navbar-item is-family-secondary is-size-3 has-text-white"
          to="/"
        >
          Thinga
        </Link>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="mainNavbar"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="mainNavbar"
        className="navbar-menu is-size-5 has-text-weight-semibold"
      >
        <div className="navbar-end">
          <Link to="/account" className="navbar-item mr-1">
            Account
          </Link>
        </div>
      </div>
    </nav>

    {children}

    <footer className="footer mt-3">
      <div className="content has-text-centered">
        <p>
          Thinga is open source; so you can see its source code{" "}
          <a href="https://github.com/sheikhartin/thinga">here</a> and{" "}
          <a href="https://github.com/sheikhartin/thinga-website">here</a>.
        </p>
        <p>Developed with ❤️ by Artin!</p>
      </div>
    </footer>
  </>
);

export default Layout;

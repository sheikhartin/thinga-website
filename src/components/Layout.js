import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { toggleNavbar } from "../scripts/helpers";

import "../styles/main.css";

const Layout = ({ children }) => {
  useEffect(() => {
    toggleNavbar();
  }, []);

  return (
    <>
      <nav className="navbar p-2 is-unselectable">
        <div className="navbar-brand mx-auto is-justify-content-center">
          <Link
            className="navbar-item is-family-secondary is-size-3 has-text-white"
            to="/"
          >
            Thinga
          </Link>

          <a
            // href="#/"
            role="button"
            className="navbar-burger has-text-white-bis"
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

        <div id="mainNavbar" className="navbar-menu is-size-5">
          <div className="navbar-end">
            <a
              href="mailto:sheikhartin+thinga@gmail.com?subject=Good to have in Thinga!"
              className="navbar-item mr-1"
            >
              Good to have
            </a>
            <Link to="/top-ranks" className="navbar-item mr-1">
              Top ranks
            </Link>
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
          <p>
            Developed with ❤️ by{" "}
            <a href="https://github.com/sheikhartin">Artin</a> in Fall 2024.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Layout;

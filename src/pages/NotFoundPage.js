import React from "react";
import { Helmet } from "react-helmet";

const NotFoundPage = () => (
  <>
    <Helmet>
      <title>Error 404 | Thinga</title>
    </Helmet>

    <section className="section is-align-self-center">
      <h3 className="subtitle is-3 is-family-secondary">Page Not Found!</h3>
      <p>The page you are looking for does not exist.</p>
    </section>
  </>
);

export default NotFoundPage;

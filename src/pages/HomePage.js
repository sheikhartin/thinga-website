import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import funnyDog from "../assets/images/funny-dog.jpg";
import deliciousPizza from "../assets/images/delicious-pizza.jpg";

const HomePage = () => (
  <>
    <Helmet>
      <title>Home | Thinga</title>
    </Helmet>

    <section className="section">
      <h3 className="subtitle is-3 is-family-secondary has-text-centered">
        Compare things and rate the one you like the most to increase its
        popularity!
      </h3>

      <div className="columns is-3-desktop comparison-box">
        <div className="column is-two-fifths my-auto has-text-centered is-size-5-mobile is-size-4-tablet is-size-3-desktop">
          <img src={funnyDog} alt="Funny dog" />
          <p className="mt-2">Funny dog</p>
        </div>
        <div className="column m-auto is-size-4-mobile is-size-3-tablet is-size-2-desktop has-text-centered has-text-weight-semibold">
          Or
        </div>
        <div className="column is-two-fifths my-auto has-text-centered is-size-5-mobile is-size-4-tablet is-size-3-desktop">
          <img src={deliciousPizza} alt="Delicious pizza" />
          <p className="mt-2">Delicious pizza</p>
        </div>
      </div>

      <div className="container has-text-centered">
        <Link className="button is-medium is-primary" to="/play">
          Play now
        </Link>
      </div>
    </section>
  </>
);

export default HomePage;

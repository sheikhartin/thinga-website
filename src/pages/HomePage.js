import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import funnyDogFace from "../assets/images/funny-dog-face.jpg";
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

      <div className="fixed-grid has-5-cols-desktop comparison-box">
        <div className="grid">
          <div className="cell is-col-span-2 my-auto has-text-centered">
            <img src={funnyDogFace} alt="Funny dog face" />
            <p className="mt-2">Funny dog face</p>
          </div>
          <div className="cell m-auto is-size-3">Or</div>
          <div className="cell is-col-span-2 my-auto has-text-centered">
            <img src={deliciousPizza} alt="Delicious pizza" />
            <p className="mt-2">Delicious pizza</p>
          </div>
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

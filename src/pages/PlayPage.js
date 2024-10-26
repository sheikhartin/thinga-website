import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import { client } from "../api";
import { getImagePath } from "../utils";

const PlayGamePage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomImages = async () => {
    try {
      const response = await client.get("/images/random/");
      setImages(response.data);
    } catch (err) {
      setError(err.response.data.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (imageId) => {
    try {
      await client.post(`/images/${imageId}/rate/`);
      fetchRandomImages(); // Fetch new images after voting
    } catch (err) {
      setError(err.response.data.detail || err.message);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await client.get("/users/me/");
        fetchRandomImages();
      } catch (err) {
        navigate("/account");
      }
    };

    checkAuthentication();
  }, [navigate]);

  if (loading) {
    return (
      <div className="is-size-3">
        Loading images... Please wait. Some images may take a moment to load
        completely.
      </div>
    );
  } else if (error) {
    return <div className="is-size-3">Error: {error}</div>;
  }

  return (
    <>
      <Helmet>
        <title>Play Game | Thinga</title>
      </Helmet>

      <section className="section">
        <h3 className="subtitle is-3 is-family-secondary has-text-centered">
          Battle of the best!
        </h3>

        <div className="columns is-3-desktop comparison-box">
          <div
            className="column is-two-fifths my-auto has-text-centered is-size-5-mobile is-size-4-tablet is-size-3-desktop"
            onClick={() => handleVote(images[0].id)}
          >
            <img
              src={getImagePath(images[0].media_file)}
              alt={images[0].alt_text || "Option 1"}
            />
            {images[0].alt_text && <p className="mt-2">{images[0].alt_text}</p>}
          </div>
          <div className="column m-auto is-size-4-mobile is-size-3-tablet is-size-2-desktop has-text-centered has-text-weight-semibold">
            Or
          </div>
          <div
            className="column is-two-fifths my-auto has-text-centered is-size-5-mobile is-size-4-tablet is-size-3-desktop"
            onClick={() => handleVote(images[1].id)}
          >
            <img
              src={getImagePath(images[1].media_file)}
              alt={images[1].alt_text || "Option 2"}
            />
            {images[1].alt_text && <p className="mt-2">{images[1].alt_text}</p>}
          </div>
        </div>

        <div className="field is-grouped is-grouped-centered mt-4">
          <div className="control">
            <Link to="/top-ranks" className="button is-link mr-3">
              View top ranks
            </Link>
          </div>
          <div className="control">
            <button className="button is-link" onClick={fetchRandomImages}>
              Get new images
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlayGamePage;

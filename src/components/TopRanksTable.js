import { useState, useEffect } from "react";

import { client } from "../api";
import { getImagePath } from "../utils";

const TopRanksTable = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopRankedImages = async () => {
      try {
        const response = await client.get("/images/top-ranked/");
        setImages(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRankedImages();
  }, []);

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
    <table id="rank-table" className="table my-auto mx-auto">
      <thead className="is-family-secondary">
        <tr>
          <th>
            <abbr title="Leaderboard position">LP</abbr>
          </th>
          <th>Visual</th>
          <th>Caption</th>
          <th>Votes</th>
          <th>Date added</th>
        </tr>
      </thead>
      <tbody>
        {images.map((image, index) => {
          const imagePath = getImagePath(image.media_file);
          return (
            <tr key={image.id}>
              <th>{index + 1}</th>
              <th>
                <a href={imagePath} target="_blank" rel="noreferrer">
                  <img
                    src={imagePath}
                    alt={image.alt_text || "No alt text provided"}
                  />
                </a>
              </th>
              <td>{image.alt_text || "-"}</td>
              <td>{image.score}</td>
              <td>{new Date(image.created_at).toLocaleString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TopRanksTable;

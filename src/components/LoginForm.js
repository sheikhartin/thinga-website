import { useState } from "react";

import { client } from "../api";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions

    try {
      setLoading(true);
      await client.post("/login/", {
        username: username,
        password: password,
      });
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="fixed-grid has-1-cols has-4-cols-desktop"
    >
      <div className="grid">
        <div className="cell is-col-start-2-desktop is-col-span-2">
          <h2 className="subtitle is-3 is-family-secondary has-text-centered">
            Login
          </h2>
        </div>

        <div className="cell is-col-start-2-desktop is-col-span-2 field">
          <label className="label">Username:</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. JohnDoe"
              required
            />
          </div>
        </div>
        <div className="cell is-col-start-2-desktop is-col-span-2 field">
          <label className="label">Password:</label>
          <div className="control">
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="e.g. chuckNorris"
              required
            />
          </div>
        </div>

        <div className="cell is-col-start-2-desktop is-col-span-2">
          {error && (
            <div className="notification is-danger is-light">{error}</div>
          )}
        </div>

        <div className="cell is-col-start-2-desktop is-col-span-2 field">
          <div className="control">
            <button
              type="submit"
              className="button is-primary is-fullwidth"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;

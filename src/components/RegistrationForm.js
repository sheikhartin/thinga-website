import { useState } from "react";

import { client } from "../api";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("display_name", displayName);
    formData.append("bio", bio);
    if (avatarFile) formData.append("avatar_file", avatarFile);

    try {
      setLoading(true);
      await client.post("/users/", formData);
      window.location.reload();
    } catch (err) {
      setError(err.response.data.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="fixed-grid has-1-cols has-4-cols-desktop"
    >
      <div className="grid">
        <div className="cell is-col-start-2-desktop is-col-span-2">
          <h2 className="subtitle is-3 is-family-secondary has-text-centered">
            Register
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
          <label className="label">Email:</label>
          <div className="control">
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. johndoe@example.com"
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
        <div className="cell is-col-start-2-desktop is-col-span-2 field">
          <label className="label">Display name:</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. John Doe"
            />
          </div>
        </div>
        <div className="cell is-col-start-2-desktop is-col-span-2 field">
          <label className="label">Bio:</label>
          <div className="control">
            <textarea
              className="textarea has-fixed-size"
              value={bio}
              rows="2"
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>
        <div className="cell is-col-start-2-desktop is-col-span-2 field">
          <label className="label">Avatar:</label>
          <div className="control">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files)}
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
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;

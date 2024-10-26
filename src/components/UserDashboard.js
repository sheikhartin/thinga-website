import { useState, useEffect } from "react";

import { client } from "../api";
import { getImagePath } from "../utils";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await client.get("/users/me/");
      setUser(response.data);
      setUsername(response.data.username);
      setEmail(response.data.email);
      setDisplayName(response.data.profile.display_name);
      setBio(response.data.profile.bio);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (loading) return;

    const formData = new FormData();
    if (username !== user.username) formData.append("username", username);
    if (email !== user.email) formData.append("email", email);
    if (password) formData.append("password", password);
    if (displayName !== user.profile.display_name)
      formData.append("display_name", displayName);
    if (bio !== user.profile.bio) formData.append("bio", bio);
    if (avatarFile) formData.append("avatar_file", avatarFile);

    try {
      setLoading(true);
      await client.patch("/users/me/", formData);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await client.post("/logout/");
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading || error) {
    return (
      <div className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8">
              {loading && <div className="is-size-3">Loading user data...</div>}
              {error && (
                <div className="notification is-danger is-light">
                  Error: {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const avatarUrl = getImagePath(user.profile.avatar_file, "avatars");

  return (
    <div className="fixed-grid has-1-cols has-4-cols-desktop">
      <div className="grid">
        <div className="cell is-col-start-2-desktop is-col-span-2">
          <h2 className="subtitle is-3 is-family-secondary has-text-centered">
            User Dashboard
          </h2>

          <figure
            className="image is-5by4 mx-auto mb-3"
            style={{ width: "200px" }}
          >
            <a href={avatarUrl} target="_blank" rel="noreferrer">
              <img
                src={avatarUrl}
                alt={user.profile.display_name}
                style={{ borderRadius: "0.5rem" }}
              />
            </a>
          </figure>

          {editing ? (
            <form onSubmit={handleUpdateProfile}>
              <div className="field">
                <label className="label">Username:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email:</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password:</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Display name:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
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
              <div className="field">
                <label className="label">Avatar:</label>
                <div className="control">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatarFile(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="field mt-2 mb-5">
                <div className="control has-text-right">
                  <button type="submit" className="button is-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <>
              <div className="field">
                <label className="label">Username:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={username}
                    readOnly
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email:</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    value={email}
                    readOnly
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Display name:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={displayName}
                    readOnly
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Bio:</label>
                <div className="control">
                  <textarea
                    className="textarea has-fixed-size"
                    value={bio}
                    rows="2"
                    readOnly
                  />
                </div>
              </div>
            </>
          )}

          <div className="field is-grouped is-grouped-right">
            <div className="control">
              <button
                className="button is-danger is-dark"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            <div className="control">
              <button
                className="button is-link"
                onClick={() => setEditing(!editing)}
              >
                {editing ? "Cancel" : "Edit profile"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

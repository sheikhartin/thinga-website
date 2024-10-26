import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Cookies from "js-cookie";

import { client } from "../api";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import UserDashboard from "../components/UserDashboard";

const AccountPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkLoginStatus = async () => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      try {
        await client.get("/users/me/");
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleToggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
      <Helmet>
        <title>Account | Thinga</title>
      </Helmet>

      <section className="section">
        {loading ? (
          <div className="is-size-3 has-text-centered">
            Checking login status...
          </div>
        ) : error ? (
          <div className="notification is-danger is-light has-text-centered">
            {error}
          </div>
        ) : isLoggedIn ? (
          <UserDashboard />
        ) : (
          <>
            {showLogin ? <LoginForm /> : <RegistrationForm />}
            <div className="field mt-5 has-text-centered">
              <span
                className="is-link has-text-weight-semibold"
                style={{ cursor: "pointer" }}
                onClick={handleToggleForm}
              >
                {showLogin
                  ? "Don't have an account? Register now."
                  : "Already have an account? Login."}
              </span>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default AccountPage;

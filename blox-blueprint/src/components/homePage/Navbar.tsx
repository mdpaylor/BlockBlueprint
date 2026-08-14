import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/blox-blueprint-logo.png";

function Navbar() {
  const { user, isAuthLoading } = useAuth();

  return (
    <header className="navbar">
      <Link className="homepage-brand" to="/">
        <img
          src={logo}
          alt="BloxBlueprint logo"
          className="homepage-brand-logo"
        />

        <span>
          Blox<span className="brand-accent">Blueprint</span>
        </span>
      </Link>

      <nav className="nav-links" aria-label="Main Navigation">
        <a href="#features">Features</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="login-register-buttons">
        {!isAuthLoading &&
          (user ? (
            <Link className="button button-primary nav-button" to="/dashboard">
              Open Dashboard
            </Link>
          ) : (
            <>
              <Link className="button button-primary nav-button" to="/register">
                Get Started
              </Link>

              <Link className="button button-secondary nav-button" to="/login">
                Login
              </Link>
            </>
          ))}
      </div>
    </header>
  );
}

export default Navbar;

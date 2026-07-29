import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="/">
        <img
          src="../src/assets/blox-blueprint-logo.png"
          alt=""
          className="brand-logo"
        />

        <span>
          Blox<span className="brand-accent">Blueprint</span>
        </span>
      </a>

      <nav className="nav-links" aria-label="Main Navigation">
        <a href="#features">Features</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="login-register-buttons">
        <Link className="button button-primary nav-button" to="/register">
          Get Started
        </Link>

        <Link className="button button-secondary nav-button" to="/login">
          Login
        </Link>
      </div>
    </header>
  );
}

export default Navbar;

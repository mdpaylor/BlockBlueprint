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
        <a className="button button-primary nav-button" href="/auth/register">
          Get Started
        </a>

        <a className="button button-secondary nav-button" href="/auth/login">
          Login
        </a>
      </div>
    </header>
  );
}

export default Navbar;

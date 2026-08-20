import { Link } from "react-router-dom";

function MainBrand() {
  return (
    <Link to="/dashboard" className="main-brand">
      <img
        src="../../src/assets/blox-blueprint-logo.png"
        alt=""
        className="main-brand-logo"
      />
      <span>
        Blox<span className="main-brand-accent">Blueprint</span>
      </span>
    </Link>
  );
}

export default MainBrand;

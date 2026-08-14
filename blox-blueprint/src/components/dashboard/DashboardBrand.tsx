import { Link } from "react-router-dom";

function DashboardBrand() {
  return (
    <Link to="/dashboard" className="dashboard-brand">
      <img
        src="../src/assets/blox-blueprint-logo.png"
        alt=""
        className="dashboard-brand-logo"
      />
      <span>
        Blox<span className="dashboard-brand-accent">Blueprint</span>
      </span>
    </Link>
  );
}

export default DashboardBrand;

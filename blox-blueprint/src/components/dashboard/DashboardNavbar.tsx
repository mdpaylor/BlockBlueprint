import DashboardProjectDropdown from "./DashboardProjectDropdown";

function DashboardNavbar() {
  return (
    <header className="dashboard-navbar">
      <div className="dashboard-brand">
        <img
          src="../src/assets/blox-blueprint-logo.png"
          alt=""
          className="dashboard-brand-logo"
        />
        <span>
          Blox<span className="dashboard-brand-accent">Blueprint</span>
        </span>
      </div>

      <DashboardProjectDropdown />

      <div className="dashboard-search"></div>

      <div className="dashboard-right-icons"></div>
    </header>
  );
}

export default DashboardNavbar;

import { Outlet } from "react-router-dom";
import "../css/Dashboard.css";
import DashboardSidebar from "../components/DashboardSidebar";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
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

        <div className="dashboard-dropdown"></div>

        <div className="dashboard-search"></div>

        <div className="dashboard-right-icons"></div>
      </header>

      <div className="dashboard-main">
        <DashboardSidebar />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;

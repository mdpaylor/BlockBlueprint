import { Outlet } from "react-router-dom";
import "../css/dashboard/MainLayout.css";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

function MainLayout() {
  return (
    <div className="dashboard-layout">
      <DashboardNavbar />

      <div className="dashboard-main">
        <DashboardSidebar />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;

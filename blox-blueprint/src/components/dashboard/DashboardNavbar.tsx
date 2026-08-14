import { Bell, Settings } from "lucide-react";
import DashboardBrand from "./DashboardBrand";
import DashboardProjectDropdown from "./DashboardProjectDropdown";
import DashboardSearch from "./DashboardSearch";
import { NavLink } from "react-router";

function DashboardNavbar() {
  let profileImage = ""; // #TODO: Replace with the actual path to the profile image

  return (
    <header className="dashboard-navbar">
      <DashboardBrand />
      <DashboardProjectDropdown />
      <DashboardSearch />

      <div className="dashboard-right-icons">
        <button
          className="dashboard-icon-button"
          type="button"
          aria-label="Notifications"
        >
          <Bell />
        </button>

        <NavLink
          className="dashboard-icon-button"
          to="/dashboard/settings"
          aria-label="Settings"
        >
          <Settings />
        </NavLink>

        <NavLink
          className="dashboard-profile-button"
          to="/user/profile"
          aria-label="Profile"
        >
          <img src={profileImage} alt="" />
          <span className="profile-status" />
        </NavLink>
      </div>
    </header>
  );
}

export default DashboardNavbar;

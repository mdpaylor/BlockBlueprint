import { Bell, Settings } from "lucide-react";
import MainBrand from "./MainBrand";
import MainProjectDropdown from "./MainProjectDropdown";
import MainSearch from "./MainSearch";
import { NavLink } from "react-router";

function MainNavbar() {
  let profileImage = ""; // #TODO: Replace with the actual path to the profile image

  return (
    <header className="main-navbar">
      <MainBrand />
      <MainProjectDropdown />
      <MainSearch />

      <div className="main-right-icons">
        <button
          className="main-icon-button"
          type="button"
          aria-label="Notifications"
        >
          <Bell />
        </button>

        <NavLink
          className="main-icon-button"
          to="/dashboard/settings"
          aria-label="Settings"
        >
          <Settings />
        </NavLink>

        <NavLink
          className="main-profile-button"
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

export default MainNavbar;

import {
  Rocket,
  Box,
  CircleDollarSign,
  ClipboardCheck,
  Gamepad2,
  Grid2x2,
  NotebookText,
  RefreshCw,
  Tag,
  type LucideIcon,
  Settings,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import dashboardSidebar from "../../assets/blox_dashboard_sidebar.png";

type SidebarOption = {
  title: string;
  path: string;
  icon: LucideIcon;
};

const sidebarOptions: SidebarOption[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: Grid2x2,
  },
  {
    title: "Experiences",
    path: "/dashboard/experiences",
    icon: Gamepad2,
  },
  {
    title: "Components",
    path: "/dashboard/components",
    icon: Box,
  },
  {
    title: "Tasks",
    path: "/dashboard/tasks",
    icon: ClipboardCheck,
  },
  {
    title: "Updates",
    path: "/dashboard/updates",
    icon: RefreshCw,
  },
  {
    title: "Monetization",
    path: "/dashboard/monetization",
    icon: CircleDollarSign,
  },
  {
    title: "Notes",
    path: "/dashboard/notes",
    icon: NotebookText,
  },
  {
    title: "Tags",
    path: "/dashboard/tags",
    icon: Tag,
  },
];

function DashboardSidebar() {
  return (
    <aside className="dashboard-sidebar">
      <nav className="dashboard-sidebar-links">
        {sidebarOptions.map(({ title, path, icon: Icon }) => (
          <NavLink
            key={title}
            to={path}
            end={path === "/dashboard"}
            className={({ isActive }) =>
              `dashboard-sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <Icon />
            <span>{title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="lower-content">
        <div className="dashboard-experience-info">
          <Rocket />
          <div className="dashboard-experience-info-text">
            <span className="dashboard-experience-info-title">
              My Experience
            </span>
            <span className="dashboard-experience-update-version">
              Update v1.0.0
            </span>
          </div>
        </div>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            isActive
              ? "dashboard-project-settings active"
              : "dashboard-project-settings"
          }
        >
          <Settings />
          <span>Project Settings</span>
          <ChevronRight />
        </NavLink>

        <div className="dashboard-sidebar-image">
          <img src={dashboardSidebar} alt="" />
        </div>
      </div>
    </aside>
  );
}

export default DashboardSidebar;

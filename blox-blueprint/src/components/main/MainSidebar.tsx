import {
  Rocket,
  Box,
  CircleDollarSign,
  ClipboardCheck,
  Gamepad2,
  Grid2x2,
  NotebookText,
  Tag,
  type LucideIcon,
  Settings,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import dashboardSidebar from "../../assets/blox_dashboard_sidebar.png";
import useGetActiveExperience from "../../hooks/useGetActiveExperience";

type SidebarOption = {
  title: string;
  path: string;
  icon: LucideIcon;
};

function MainSidebar() {
  const activeExperience = useGetActiveExperience();
  const dashboardPath = activeExperience
    ? `/experiences/${activeExperience.id}/dashboard`
    : "/dashboard";

  let experiencePath = "/0";
  if (activeExperience) experiencePath = `/${activeExperience.id}`;

  const sidebarOptions: SidebarOption[] = [
    {
      title: "Dashboard",
      path: dashboardPath,
      icon: Grid2x2,
    },
    {
      title: "Experiences",
      path: `/experiences${experiencePath}/experiences`,
      icon: Gamepad2,
    },
    {
      title: "Components",
      path: `/experiences${experiencePath}/components`,
      icon: Box,
    },
    {
      title: "Tasks",
      path: `/experiences${experiencePath}/tasks`,
      icon: ClipboardCheck,
    },
    {
      title: "Updates",
      path: `/experiences${experiencePath}/updates`,
      icon: Rocket,
    },
    {
      title: "Monetization",
      path: `/experiences${experiencePath}/monetization`,
      icon: CircleDollarSign,
    },
    {
      title: "Notes",
      path: `/experiences${experiencePath}/notes`,
      icon: NotebookText,
    },
    {
      title: "Tags",
      path: `/experiences${experiencePath}/tags`,
      icon: Tag,
    },
  ];

  return (
    <aside className="main-sidebar">
      <nav className="main-sidebar-links">
        {sidebarOptions.map(({ title, path, icon: Icon }) => (
          <NavLink
            key={title}
            to={path}
            end={true}
            className={({ isActive }) =>
              `main-sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <Icon />
            <span>{title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="lower-content">
        <SidebarUpdateSection
          title={activeExperience?.title ?? "No Project Selected"}
          updateVersion={activeExperience?.updateVersion ?? ""}
        />

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            isActive ? "main-project-settings active" : "main-project-settings"
          }
        >
          <Settings />
          <span>Project Settings</span>
          <ChevronRight />
        </NavLink>

        <div className="main-sidebar-image">
          <img src={dashboardSidebar} alt="" />
        </div>
      </div>
    </aside>
  );
}

type SidebarUpdateSectionProps = {
  title: string;
  updateVersion: string;
};

function SidebarUpdateSection({
  title,
  updateVersion,
}: SidebarUpdateSectionProps) {
  return (
    <div className="main-experience-info">
      <Rocket />
      <div className="main-experience-info-text">
        <span className="main-experience-info-title">{title}</span>
        <span className="main-experience-update-version">
          {updateVersion !== "" ? `Update ${updateVersion}` : "No updates yet"}
        </span>
      </div>
    </div>
  );
}

export default MainSidebar;

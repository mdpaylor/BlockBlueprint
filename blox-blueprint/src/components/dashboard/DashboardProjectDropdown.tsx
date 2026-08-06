import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Project = {
  id: number;
  name: string;
};

const projects: Project[] = [
  { id: 1, name: "Adventure Quest" },
  { id: 2, name: "Racing Legends" },
  { id: 3, name: "Zombie Survival" },
];

function DashboardProjectDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  // #TODO: Implement project selection logic (add logic if there are no projects for this user)
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    projects[0] ?? null,
  );

  function selectProject(project: Project) {
    setSelectedProject(project);
    setIsOpen(false);
  }

  return (
    <div className="dashboard-project-dropdown">
      <button
        className="dashboard-project-dropdown-button"
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() =>
          setIsOpen((current) => !current && selectedProject !== null)
        }
      >
        <span>{selectedProject?.name ?? "No projects"}</span>
        {projects.length > 0 && (
          <ChevronDown
            className={isOpen ? "dropdown-chevron open" : "dropdown-chevron"}
            size={16}
          />
        )}
      </button>

      {isOpen && (
        <div className="dashboard-project-menu" role="listbox">
          {projects.map((project) => (
            <button
              key={project.id}
              className={
                project.id === selectedProject?.id
                  ? "dashboard-project-option selected"
                  : "dashboard-project-option"
              }
              type="button"
              role="option"
              aria-selected={project.id === selectedProject?.id}
              onClick={() => selectProject(project)}
            >
              {project.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardProjectDropdown;

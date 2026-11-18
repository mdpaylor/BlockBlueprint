import { useState } from "react";
import { ChevronDown, ChevronRight, FolderOpen, Layers } from "lucide-react";
import type { ComponentType } from "../../types/experienceTypes";
import { resolveComponentIcon } from "../../utils/resolveComponentIcon";

type DashboardProjectStructureProps = {
  title: string;
  componentCounts: ComponentType[] | null;
};

function DashboardWidgetProjectStructure({
  title,
  componentCounts,
}: DashboardProjectStructureProps) {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <div className="dcw-project-structure dash-widget">
      <div className="dcw-ps-title-section">Project Structure</div>
      <div className="dcw-ps-tree">
        <div className="dcw-ps-root" onClick={() => setExpanded(!expanded)}>
          <ChevronDown
            size={16}
            className={`dcw-ps-root-chevron${expanded ? "" : " collapsed"}`}
          />
          <FolderOpen size={18} className="dcw-ps-root-icon" />
          <span className="dcw-ps-root-title">{title}</span>
        </div>
        {expanded && (
          <div className="dcw-ps-component-section">
            {componentCounts &&
              componentCounts.map(({ type, count }) => {
                const icon = resolveComponentIcon(type);

                return (
                  <div className="dcw-ps-cs-component" key={type}>
                    <span className="dcw-ps-cs-branch" />
                    {icon.kind === "image" ? (
                      <img
                        src={icon.src}
                        alt={type}
                        className="dcw-ps-cs-component-icon"
                      />
                    ) : (
                      <icon.Icon size={18} className="dcw-ps-cs-component-icon" />
                    )}
                    <span className="dcw-ps-cs-component-label">{type}</span>
                    <span className="dcw-ps-cs-component-count">{count}</span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <div className="dcw-ps-view-components-section">
        <Layers size={22} strokeWidth={2} />
        <span>View All Components</span>
        <ChevronRight size={20} strokeWidth={2} className="dcw-ps-vc-chevron" />
      </div>
    </div>
  );
}

export default DashboardWidgetProjectStructure;

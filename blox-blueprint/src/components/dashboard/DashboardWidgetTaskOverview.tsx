import { useState } from "react";
import type { TaskBrief } from "../../types/experienceTypes";
import { Clock, Plus } from "lucide-react";

type DashboardTaskOverviewProps = {
  taskBriefs: TaskBrief[] | undefined;
};

const FILTERS = ["All", "To Do", "In Progress", "Done"];

function DashboardWidgetTaskOverview({
  taskBriefs,
}: DashboardTaskOverviewProps) {
  // TODO: Visual only for now. TaskBrief has no status field, so filtering
  // requires adding status to the server's ExperienceDataDto.TaskBrief.
  const [activeFilter, setActiveFilter] = useState<string>("All");

  return (
    <div className="dcw-task-widget dash-widget">
      <div className="dcw-tw-title">
        <span>Tasks Overview</span>
        <span className="dcw-tw-view-all">View All</span>
      </div>
      <div className="dcw-tw-c-progress-filters">
        {FILTERS.map((filter) => (
          <div
            key={filter}
            className={`dcw-tw-c-pf-filter${activeFilter === filter ? " active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </div>
        ))}
      </div>
      <div className="dcw-tw-content">
        <div className="dcw-tw-c-titles dcw-tw-c-columns">
          <span>Task</span>
          <span>Progress</span>
        </div>
        <div className="dcw-tw-c-tasks">
          {taskBriefs &&
            taskBriefs.map(({ id, title, priority, percentageComplete }) => {
              const priorityColor =
                priority === "HIGH"
                  ? "#FF0000"
                  : priority === "MEDIUM"
                    ? "#FFFF00"
                    : "#0000FF";

              return (
                <div className="dcw-tw-c-t-task dcw-tw-c-columns" key={id}>
                  <div className="dcw-tw-c-t-t-title-section">
                    <div className="dcw-tw-c-t-t-ts-status-icon">
                      <Clock color={priorityColor} size={18} />
                    </div>
                    <div className="dcw-tw-c-t-t-ts-text-priority">
                      <span className="dcw-tw-c-t-t-ts-tp-title">{title}</span>
                      <span
                        className="dcw-tw-c-t-t-ts-tp-priority"
                        style={{
                          color: priorityColor,
                          borderColor: priorityColor,
                          backgroundColor: `${priorityColor}26`,
                        }}
                      >
                        {priority.charAt(0) + priority.slice(1).toLowerCase()}
                      </span>
                    </div>
                  </div>
                  <div className="dcw-tw-c-t-t-progress">
                    <div className="dcw-tw-c-t-t-p-bar">
                      <div
                        className="dcw-tw-c-t-t-p-b-completed"
                        style={{ width: `${percentageComplete}%` }}
                      ></div>
                    </div>
                    <span className="dcw-tw-c-t-t-p-percentage">
                      {percentageComplete}%
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="dcw-tw-view-tasks-section">
        <Plus size={18} />
        <span>New Task</span>
      </div>
    </div>
  );
}

export default DashboardWidgetTaskOverview;

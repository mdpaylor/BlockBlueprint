import { ChevronRight, Rocket } from "lucide-react";
import type { NextUpdate } from "../../types/experienceTypes";
import { formatDate } from "../../utils/formatDate";

type DashboardUpcomingUpdateProps = {
  nextUpdate: NextUpdate | null;
};

const STATUS_DISPLAY: Record<string, { label: string; color: string }> = {
  PLANNING: { label: "Planned", color: "#1677ff" },
  IN_PROGRESS: { label: "In Progress", color: "#f59e0b" },
};

function DashboardWidgetUpcomingUpdate({
  nextUpdate,
}: DashboardUpcomingUpdateProps) {
  const status = nextUpdate
    ? (STATUS_DISPLAY[nextUpdate.status] ?? {
        label: nextUpdate.status,
        color: "#64748b",
      })
    : null;

  return (
    <div className="dcw-upcoming-update dash-widget">
      <div className="dash-widget-title">
        <span>Upcoming Update</span>
        <span className="dash-link">View All</span>
      </div>
      <div className="dcw-uu-card">
        {nextUpdate && status ? (
          <>
            <div className="dcw-uu-c-heading">
              <span className="dcw-uu-c-title">
                v{nextUpdate.version} – {nextUpdate.title}
              </span>
              <span
                className="dcw-uu-c-status"
                style={{
                  color: status.color,
                  borderColor: status.color,
                  backgroundColor: `${status.color}26`,
                }}
              >
                {status.label}
              </span>
            </div>
            <div className="dcw-uu-c-field">
              <span className="dcw-uu-c-label">Release Date</span>
              <span>{formatDate(nextUpdate.releaseDate)}</span>
            </div>
            <div className="dcw-uu-c-field">
              <span className="dcw-uu-c-label">Tasks</span>
              <span>{nextUpdate.taskCount}</span>
            </div>
            <Rocket
              size={110}
              strokeWidth={1}
              className="dcw-uu-c-decoration"
            />
          </>
        ) : (
          <span className="dash-empty-text">No upcoming updates</span>
        )}
      </div>
      <div className="dcw-uu-roadmap">
        <span>View Update Roadmap</span>
        <ChevronRight size={20} strokeWidth={2} className="dcw-uu-roadmap-chevron" />
      </div>
    </div>
  );
}

export default DashboardWidgetUpcomingUpdate;

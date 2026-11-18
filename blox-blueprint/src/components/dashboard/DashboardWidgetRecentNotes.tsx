import { FileText, Plus } from "lucide-react";
import type { NoteBrief } from "../../types/experienceTypes";
import { formatRelativeDay } from "../../utils/formatDate";

type DashboardRecentNotesProps = {
  notes: NoteBrief[] | undefined;
};

function DashboardWidgetRecentNotes({ notes }: DashboardRecentNotesProps) {
  return (
    <div className="dcw-recent-notes dash-widget">
      <div className="dash-widget-title">
        <span>Recent Notes</span>
        <span className="dash-link">View All</span>
      </div>
      <div className="dcw-rn-list">
        {notes && notes.length > 0 ? (
          notes.map(({ id, title, updatedAt }) => (
            <div className="dcw-rn-note" key={id}>
              <FileText size={18} className="dcw-rn-note-icon" />
              <span className="dcw-rn-note-title">{title}</span>
              <span className="dcw-rn-note-date">
                {formatRelativeDay(updatedAt)}
              </span>
            </div>
          ))
        ) : (
          <span className="dash-empty-text">No notes yet</span>
        )}
      </div>
      <div className="dcw-rn-new-note">
        <Plus size={18} />
        <span>New Note</span>
      </div>
    </div>
  );
}

export default DashboardWidgetRecentNotes;

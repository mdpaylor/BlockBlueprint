import { Plus } from "lucide-react";
import type { TagBrief } from "../../types/experienceTypes";

type DashboardTagsProps = {
  tags: TagBrief[] | undefined;
};

function DashboardWidgetTags({ tags }: DashboardTagsProps) {
  return (
    <div className="dcw-tags dash-widget">
      <div className="dash-widget-title">
        <span>Tags</span>
        <span className="dash-link">
          <Plus size={16} />
          Add Tag
        </span>
      </div>
      <div className="dcw-tags-list">
        {tags && tags.length > 0 ? (
          tags.map(({ id, title, color, useCount }) => (
            <div
              className="dcw-tags-chip"
              key={id}
              style={{
                color,
                borderColor: color,
                backgroundColor: `${color}26`,
              }}
            >
              <span>{title}</span>
              <span className="dcw-tags-chip-count">{useCount}</span>
            </div>
          ))
        ) : (
          <span className="dash-empty-text">No tags yet</span>
        )}
      </div>
    </div>
  );
}

export default DashboardWidgetTags;

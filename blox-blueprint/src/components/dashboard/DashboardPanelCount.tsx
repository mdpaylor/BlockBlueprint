import { type LucideIcon } from "lucide-react";

type DashboardPanelProps = {
  icon: LucideIcon;
  color: string;
  title: string;
  count: number;
};

function DashboardPanelCount({
  icon: Icon,
  color,
  title,
  count,
}: DashboardPanelProps) {
  return (
    <div className="dashboard-top-count-panel">
      <div
        className="dashboard-top-count-panel-icon"
        style={{ backgroundColor: `${color}50` }}
      >
        <Icon size={32} strokeWidth={2} color={color} />
      </div>
      <div className="dashboard-top-count-panel-text">
        {title}
        <span>{count}</span>
      </div>
    </div>
  );
}

export default DashboardPanelCount;

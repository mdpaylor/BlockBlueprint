import { type LucideIcon } from "lucide-react";

type DashboardWidgetProps = {
  icon: LucideIcon;
  color: string;
  title: string;
  count: number;
};

function DashboardWidgetCount({
  icon: Icon,
  color,
  title,
  count,
}: DashboardWidgetProps) {
  return (
    <div className="dash-top-count-widget dash-widget">
      <div
        className="dash-top-count-widget-icon"
        style={{ backgroundColor: `${color}28` }}
      >
        <Icon size={30} strokeWidth={2} color={color} />
      </div>
      <div className="dash-top-count-widget-text">
        {title}
        <span>{count}</span>
      </div>
    </div>
  );
}

export default DashboardWidgetCount;

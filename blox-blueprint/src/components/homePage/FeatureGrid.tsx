import {
  Box,
  ClipboardCheck,
  CircleDollarSign,
  NotebookText,
  Rocket,
  Tag,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

const features: Feature[] = [
  {
    title: "Component Mapping",
    description:
      "Track scripts, folders, remotes, and systems in a clear structure.",
    icon: Box,
    color: "#2563eb",
  },
  {
    title: "Task Management",
    description:
      "Organize priorities, statuses, and progress for your entire team.",
    icon: ClipboardCheck,
    color: "#8b5cf6",
  },
  {
    title: "Update Planning",
    description:
      "Plan releases, preview features, and manager versioned updates.",
    icon: Rocket,
    color: "#22d3ee",
  },
  {
    title: "Monetization Tracking",
    description: "Manage gamepasses, developer products, and pricing.",
    icon: CircleDollarSign,
    color: "#10b981",
  },
  {
    title: "Notes & Documentation",
    description:
      "Keep design notes, references, and docs tied to project items.",
    icon: NotebookText,
    color: "#f59e0b",
  },
  {
    title: "Tagging System",
    description: "Categorize and filter work across every part of your game.",
    icon: Tag,
    color: "#2563eb",
  },
];

function FeatureGrid() {
  return (
    <section className="features" id="features">
      <div className="feature-grid">
        {features.map(({ title, description, icon: Icon, color }) => (
          <article className="feature-card" key={title}>
            <div className="feature-icon" style={{ color }}>
              <Icon size={32} strokeWidth={2} />
            </div>

            <div className="feature-text">
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeatureGrid;

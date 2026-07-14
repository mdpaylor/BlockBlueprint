import {
  Box,
  Blocks,
  LayoutList,
  ClipboardCheck,
  Rocket,
  PackageOpen,
  type LucideIcon,
} from "lucide-react";

type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type Stat = {
  icon: LucideIcon;
  amount: string;
  color: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: Blocks,
    title: "Structure Your Game",
    description:
      "Map out components, systems, and assets in a clean hierarchy.",
  },
  {
    icon: LayoutList,
    title: "Track Development",
    description:
      "Assign tasks, write notes, and monitor progress for your team.",
  },
  {
    icon: PackageOpen,
    title: "Ship Updates",
    description:
      "Plan releases, communicate changes, and ship with confidence.",
  },
];

const stats: Stat[] = [
  {
    icon: Box,
    amount: "100+",
    color: "#2563eb",
    description: "Components Organized",
  },
  {
    icon: ClipboardCheck,
    amount: "50+",
    color: "#8b5cf6",
    description: "Tasks Tracked",
  },
  {
    icon: Rocket,
    amount: "10+",
    color: "#22d3ee",
    description: "Planned Updates",
  },
];

function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-it-works-inner">
        <h2 className="how-it-works-title">How It Works</h2>

        <div className="how-it-works-content">
          <div className="how-it-works-step-grid">
            {steps.map(({ icon: Icon, title, description }, index) => (
              <article className="how-it-works-step" key={title}>
                <div className="step-icon">
                  <Icon size={32} strokeWidth={2} />
                </div>

                <span className="step-number">{index + 1}</span>

                <div className="step-text">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="how-it-works-stat-grid">
            {stats.map(({ amount, icon: Icon, description, color }) => (
              <article className="how-it-works-stat" key={amount}>
                <div className="stat-icon" style={{ color }}>
                  <Icon size={40} strokeWidth={2} />
                </div>
                <div className="stat-text">
                  <strong style={{ color }}>{amount}</strong>
                  <span>{description}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;

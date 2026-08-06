import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <h1>Plan Your Roblox</h1>
          <h1>Game Like a Pro</h1>

          <p>
            Organize components, tasks, updates, monetization, and notes in one
            place so you can build smarter and ship faster.
          </p>

          <div className="hero-actions">
            <Link className="button button-primary" to="/register">
              Start Building
              <ArrowRight />
            </Link>
          </div>
        </div>

        <div className="dashboard-preview">
          <img
            src="../src/assets/dashboard-preview.png"
            alt="Dashboard Preview"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

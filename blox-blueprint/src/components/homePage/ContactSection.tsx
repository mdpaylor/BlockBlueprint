import { Download, ExternalLink, Mail, Phone } from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner">
        <div className="contact-heading">
          <span className="contact-eyebrow">Developer Contact</span>
          <h2>Interested in BloxBlueprint?</h2>
          <p>
            Connect with me, explore the source code, or download my resume to
            learn more about my software engineering experience.
          </p>
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-details">
          <h3>Michael Paylor</h3>
          <p className="contact-role">Software Engineer</p>

          <address className="contact-links">
            <a href="tel:+13362126784">
              <Phone aria-hidden="true" />
              <span>+1 (336) 212-6784</span>
            </a>

            <a href="mailto:mpaylor1998@gmail.com">
              <Mail aria-hidden="true" />
              <span>mpaylor1998@gmail.com</span>
            </a>

            <a
              href="https://github.com/mdpaylor"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub aria-hidden="true" />
              <span>GitHub</span>
              <ExternalLink className="external-icon" aria-hidden="true" />
            </a>

            <a
              href="https://www.linkedin.com/in/micpaylor"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin aria-hidden="true" />
              <span>LinkedIn</span>
              <ExternalLink className="external-icon" aria-hidden="true" />
            </a>
          </address>
        </div>

        <div className="project-purpose">
          <h3>Why I Built BloxBlueprint</h3>

          <p>
            I built BloxBlueprint to give myself a structured way to plan
            complex games, organize scripts and components, manage development
            tasks, document systems, and prepare updates from one workspace.
          </p>

          <p>
            The project also demonstractes my ability to design and build a
            full-stack application using React, Typescript, Spring/Spring Boot,
            PostgreSQL, JWT authentication, and Docker.
          </p>

          <div className="contact-actions">
            <a
              className="button button-primary"
              href="https://github.com/mdpaylor/BlockBlueprint"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={20} aria-hidden="true" />
              View Repository
              <ExternalLink size={16} aria-hidden="true" />
            </a>

            <a
              className="button contact-resume-button"
              href="/Michael_Paylor_Resume.pdf"
              download
            >
              <Download size={20} aria-hidden="true" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

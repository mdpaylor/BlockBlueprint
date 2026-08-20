import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useExperience } from "../../context/ExperienceContext";
import type { ExperienceBrief } from "../../types/experienceTypes";


function MainProjectDropdown() {
  const { activeExperience, experiences, setActiveExperience } = useExperience();
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  function selectExperience(experience: ExperienceBrief) {
    setActiveExperience(experience);
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    function handleOutsideClick(event: PointerEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerup", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerup", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="main-project-dropdown" ref={dropdownRef}>
      <button
        className="main-project-dropdown-button"
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() =>
          setIsOpen((current) => !current && activeExperience !== null)
        }
      >
        <span>{activeExperience?.title ?? "No projects"}</span>
        {(experiences?.length ?? 0) > 0 && (
          <ChevronDown
            className={isOpen ? "dropdown-chevron open" : "dropdown-chevron"}
            size={16}
          />
        )}
      </button>

      {isOpen && (
        <div className="main-project-menu" role="listbox">
          {experiences?.map((experience) => (
            <button
              key={experience.id}
              className={
                experience.id === activeExperience?.id
                  ? "main-project-option selected"
                  : "main-project-option"
              }
              type="button"
              role="option"
              aria-selected={experience.id === activeExperience?.id}
              onClick={() => selectExperience(experience)}
            >
              {experience.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default MainProjectDropdown;

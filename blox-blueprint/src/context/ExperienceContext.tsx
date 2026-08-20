import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { Experience } from "../types/experienceTypes";

type ExperienceContextValue = {
  activeExperience: Experience | null;
  experiences: Experience[] | null;
  setActiveExperience: Dispatch<SetStateAction<Experience | null>>;
  setExperiences: Dispatch<SetStateAction<Experience[] | null>>;
};

const ExperienceContext = createContext<ExperienceContextValue | undefined>(
  undefined,
);

type ExperienceProviderProps = {
  children: ReactNode;
};

export function ExperienceProvider({ children }: ExperienceProviderProps) {
  const [activeExperience, setActiveExperience] = useState<Experience | null>(
    null,
  );
  const [experiences, setExperiences] = useState<Experience[] | null>(null);

  return (
    <ExperienceContext.Provider
      value={{
        activeExperience,
        experiences,
        setExperiences,
        setActiveExperience,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const context = useContext(ExperienceContext);

  if (context === undefined) {
    throw new Error("useExperience must be used inside ExperienceProvider");
  }

  return context;
}

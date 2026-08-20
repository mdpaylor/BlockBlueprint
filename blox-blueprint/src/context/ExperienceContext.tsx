import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { ExperienceBrief } from "../types/experienceTypes";

type ExperienceContextValue = {
  activeExperience: ExperienceBrief | null;
  experiences: ExperienceBrief[] | null;
  setActiveExperience: Dispatch<SetStateAction<ExperienceBrief | null>>;
  setExperiences: Dispatch<SetStateAction<ExperienceBrief[] | null>>;
};

const ExperienceContext = createContext<ExperienceContextValue | undefined>(
  undefined,
);

type ExperienceProviderProps = {
  children: ReactNode;
};

export function ExperienceProvider({ children }: ExperienceProviderProps) {
  const [activeExperience, setActiveExperience] = useState<ExperienceBrief | null>(
    null,
  );
  const [experiences, setExperiences] = useState<ExperienceBrief[] | null>(null);

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

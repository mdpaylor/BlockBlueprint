import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useExperience } from "../context/ExperienceContext";
import { getInitialDashboardInfo } from "../services/experienceApi";
import type {
  ExperienceBrief,
  InitialDashboardDto,
} from "../types/experienceTypes";

function useGetActiveExperience() {
  const { activeExperience, experiences, setActiveExperience, setExperiences } =
    useExperience();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || experiences) return;

    const experienceBriefsPromise: Promise<ExperienceBrief[] | null> =
      fetchExperiences();

    experienceBriefsPromise.then((expBriefs) => {
      if (!expBriefs || expBriefs.length < 1) return;

      setExperiences(expBriefs);
      setActiveExperience(expBriefs[0]);
    });
  }, [user, experiences]);

  return activeExperience;
}

async function fetchExperiences(): Promise<ExperienceBrief[] | null> {
  try {
    const response = await getInitialDashboardInfo();
    const responseText = await response.text();

    let data: InitialDashboardDto | null = null;
    if (responseText) {
      try {
        data = JSON.parse(responseText) as InitialDashboardDto;
      } catch {
        console.error("The server retruned invalid JSON:", responseText);
      }
    }

    if (!response.ok) {
      console.error(
        "Experience fetch failed",
        response.status,
        response.statusText,
      );
      return null;
    }

    if (data?.experiences) return data.experiences;
  } catch (e: any) {
    console.error("Error fetching experiences", e);
  }

  return null;
}

export default useGetActiveExperience;

import { Outlet, useNavigate } from "react-router-dom";
import "../css/main/MainLayout.css";
import MainSidebar from "../components/main/MainSidebar";
import MainNavbar from "../components/main/MainNavbar";
import { useExperience } from "../context/ExperienceContext";
import { useEffect } from "react";
import { getInitialDashboardInfo } from "../services/experienceApi";
import type { ExperienceBrief, InitialDashboardDto } from "../types/experienceTypes";
import { useAuth } from "../context/AuthContext";

function MainLayout() {
  const navigate = useNavigate();
  const { setActiveExperience, setExperiences } = useExperience();
  const { user } = useAuth();

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
          response.statusText
        );
        return null;
      }

      if (data?.experiences)
        return data.experiences;
    } catch (e: any) {
      console.error("Error fetching experiences", e);
    }

    return null;
  }

  useEffect(() => {
    if (!user) return;

    const experienceBriefsPromise: Promise<ExperienceBrief[] | null> = fetchExperiences();
    experienceBriefsPromise.then((expBriefs) => {
      if (!expBriefs || expBriefs.length < 1) return;

      setExperiences(expBriefs);
      setActiveExperience(expBriefs[0]);

      navigate(`/experiences/${expBriefs[0].id}/dashboard`);
    });
  }, [user]);

  return (
    <div className="main-layout">
      <MainNavbar />

      <div className="main-main">
        <MainSidebar />

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;

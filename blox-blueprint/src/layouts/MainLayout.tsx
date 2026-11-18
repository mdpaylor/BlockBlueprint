import { Outlet, useNavigate } from "react-router-dom";
import "../css/main/MainLayout.css";
import MainSidebar from "../components/main/MainSidebar";
import MainNavbar from "../components/main/MainNavbar";
import { useEffect } from "react";
import useGetActiveExperience from "../hooks/useGetActiveExperience";

function MainLayout() {
  const navigate = useNavigate();
  const activeExperience = useGetActiveExperience();

  useEffect(() => {
    if (activeExperience)
      navigate(`/experiences/${activeExperience.id}/dashboard`);
  }, [activeExperience, navigate]);

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

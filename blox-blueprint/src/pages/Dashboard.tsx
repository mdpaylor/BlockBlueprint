import { useEffect, useState } from "react";
import { Box, ClipboardCheck, Rocket, Tag } from "lucide-react";
import type { ExperienceDataDto } from "../types/experienceTypes";
import { getSingleExperienceDashboard } from "../services/experienceApi";
import DashboardWidgetCount from "../components/dashboard/DashboardWidgetCount";
import "../css/main/Dashboard.css";
import DashboardWidgetProjectStructure from "../components/dashboard/DashboardWidgetProjectStructure";
import DashboardWidgetTaskOverview from "../components/dashboard/DashboardWidgetTaskOverview";
import useGetActiveExperience from "../hooks/useGetActiveExperience";
import DashboardWidgetUpcomingUpdate from "../components/dashboard/DashboardWidgetUpcomingUpdate";
import DashboardWidgetRecentNotes from "../components/dashboard/DashboardWidgetRecentNotes";
import DashboardWidgetTags from "../components/dashboard/DashboardWidgetTags";

function Dashboard() {
  const activeExperience = useGetActiveExperience();
  const [experienceInfo, setExperienceInfo] =
    useState<ExperienceDataDto | null>(null);

  async function fetchDashboardData(
    experienceId: number,
  ): Promise<ExperienceDataDto | null> {
    try {
      const response = await getSingleExperienceDashboard(experienceId);
      const responseText = await response.text();

      let data: ExperienceDataDto | null = null;
      if (responseText) {
        try {
          data = JSON.parse(responseText) as ExperienceDataDto;
        } catch {
          console.error(
            "Server returned invalid json for experience dashboard fetch",
          );
        }
      }

      if (!response.ok) {
        console.error(
          "Experience dashboard fetch failed",
          response.status,
          response.statusText,
        );
        return null;
      }

      if (data) return data;
    } catch (e: any) {
      console.error("Error fetching experience dashboard", e);
    }

    return null;
  }

  useEffect(() => {
    if (!activeExperience) return;

    const experienceInfoPromise: Promise<ExperienceDataDto | null> =
      fetchDashboardData(activeExperience.id);
    experienceInfoPromise.then((experienceData) => {
      if (!experienceData) return;

      setExperienceInfo(experienceData);
    });
  }, [activeExperience]);

  return (
    <div className="dash">
      <div className="dash-top-widgets">
        <DashboardWidgetCount
          icon={Box}
          color="#2563eb"
          title="Total Components"
          count={experienceInfo?.componentCount ?? 0}
        />
        <DashboardWidgetCount
          icon={ClipboardCheck}
          color="#8b5cf6"
          title="Tasks In Progress"
          count={experienceInfo?.tasksInProgressCount ?? 0}
        />
        <DashboardWidgetCount
          icon={Rocket}
          color="#22d3ee"
          title="Planned Updates"
          count={experienceInfo?.plannedUpdatesCount ?? 0}
        />
        <DashboardWidgetCount
          icon={Tag}
          color="#2563eb"
          title="Active Tags"
          count={experienceInfo?.usedTagCount ?? 0}
        />
      </div>

      <div className="dash-center-widgets">
        <DashboardWidgetProjectStructure
          title={experienceInfo?.title ?? ""}
          componentCounts={experienceInfo?.componentTypeCounts ?? null}
        />
        <DashboardWidgetTaskOverview
          taskBriefs={experienceInfo?.tasks ?? undefined}
        />

        <div className="dcw-right-column">
          <DashboardWidgetUpcomingUpdate
            nextUpdate={experienceInfo?.nextUpdate ?? null}
          />
          <DashboardWidgetRecentNotes notes={experienceInfo?.recentNotes} />
        </div>
      </div>

      <DashboardWidgetTags tags={experienceInfo?.topTags} />
    </div>
  );
}

export default Dashboard;

import { useEffect, useState } from "react";
import { Box, ClipboardCheck, Rocket, Tag } from "lucide-react";
import { useExperience } from "../context/ExperienceContext";
import type { ExperienceDataDto } from "../types/experienceTypes";
import { getSingleExperienceDashboard } from "../services/experienceApi";
import DashboardPanelCount from "../components/dashboard/DashboardPanelCount";

function Dashboard() {
  const { activeExperience } = useExperience();
  const [experienceInfo, setExperienceInfo] =
    useState<ExperienceDataDto | null>(null);

    async function fetchDashboardData(experienceId: number): Promise<ExperienceDataDto | null> {
        try {
            const response = await getSingleExperienceDashboard(experienceId);
            const responseText = await response.text();

            let data: ExperienceDataDto | null = null;
            if (responseText) {
                try {
                    data = JSON.parse(responseText) as ExperienceDataDto;
                } catch {
                    console.error("Server returned invalid json for experience dashboard fetch", )
                }
            }

            if (!response.ok) {
                console.error(
                    "Experience dashboard fetch failed",
                    response.status,
                    response.statusText
                );
                return null;
            }

            if (data) return data;
        }
        catch (e: any) {
            console.error("Error fetching experience dashboard", e);
        }

        return null;
    }

  useEffect(() => {
    if (!activeExperience) return;

    const experienceInfoPromise: Promise<ExperienceDataDto | null> = fetchDashboardData(activeExperience.id);
    experienceInfoPromise.then((experienceData) => {
        if (!experienceData) return;

        setExperienceInfo(experienceData);
    });
  }, [activeExperience]);

  return (
    <div>
        <div className="dashboard-top-panels">
            <DashboardPanelCount
                icon={Box}
                color="#2563eb"
                title="Total Components"
                count={experienceInfo?.componentCount ?? 0}
            />
            <DashboardPanelCount
                icon={ClipboardCheck}
                color="#8b5cf6"
                title="Tasks In Progress"
                count={experienceInfo?.tasksInProgressCount ?? 0}
            />
            <DashboardPanelCount
                icon={Rocket}
                color="#22d3ee"
                title="Planned Updates"
                count={experienceInfo?.plannedUpdatesCount ?? 0}
            />
            <DashboardPanelCount
                icon={Tag}
                color="#2563eb"
                title="Active Tags"
                count={experienceInfo?.usedTagCount ?? 0}
            />
        </div>
    </div>
  );
}

export default Dashboard;

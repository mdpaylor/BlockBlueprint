import { apiFetch } from "./apiClient";

export function getInitialDashboardInfo(): Promise<Response> {
    const response = apiFetch("api/dashboard", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response;
}

export function getSingleExperienceDashboard(experienceId: number) {
    const response = apiFetch(`api/experiences/${experienceId}/dashboard`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response;
}
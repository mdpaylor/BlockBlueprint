// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = "http://localhost:8080";

export function apiFetch(
    path: string, 
    options: RequestInit = {}
): Promise<Response> {
    const headers = new Headers(options.headers);

    return fetch(`${API_BASE_URL}${path}`, {
        ...options, 
        headers, 
        credentials: "include"
    });
}
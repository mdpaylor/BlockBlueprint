import type 
{ 
    LoginUserRequestDto,
    RegisterUserRequestDto,
} from "../types/authTypes";
import { apiFetch } from "./apiClient";

export function registerUser(data: RegisterUserRequestDto): Promise<Response> {
    const response = apiFetch(`/auth/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    return response;
}

export function loginUser(data: LoginUserRequestDto): Promise<Response> {
    const response = apiFetch(`/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response;
}
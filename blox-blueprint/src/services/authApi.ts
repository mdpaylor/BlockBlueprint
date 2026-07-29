import type 
{ 
    LoginUserRequestDto,
    RegisterUserRequestDto,
} from "../types/authTypes.ts";

const API_BASE_URL = "http://localhost:8080";

export async function registerUser(data: RegisterUserRequestDto): Promise<Response> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response;
}

export async function loginUser(data: LoginUserRequestDto): Promise<Response> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response;
}
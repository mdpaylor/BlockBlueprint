import type 
{ 
    LoginUserRequestDto, 
    LoginUserResponseDto, 
    RegisterUserRequestDto, 
    RegisterUserResponseDto 
} from "../types/authTypes.ts";

const API_BASE_URL = "http://localhost:8080/";

export async function registerUser(data: RegisterUserRequestDto): Promise<RegisterUserResponseDto> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
}

export async function loginUser(data: LoginUserRequestDto): Promise<LoginUserResponseDto> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}
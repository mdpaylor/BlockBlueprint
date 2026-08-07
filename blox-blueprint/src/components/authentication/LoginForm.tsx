import type { SubmitEvent } from "react";
import { loginUser } from "../../services/authApi";
import type {
  LoginUserRequestDto,
  LoginUserResponseDto,
} from "../../types/authTypes";

async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const loginUserRequest: LoginUserRequestDto = {
    username: username,
    password: password,
  };

  try {
    const response = await loginUser(loginUserRequest);
    const responseText = await response.text();

    let data: LoginUserResponseDto | null = null;
    if (responseText) {
      try {
        data = JSON.parse(responseText) as LoginUserResponseDto;
      } catch {
        console.error("The server retruned invalid JSON:", responseText);
      }
    }

    if (!response.ok) {
      console.error("Login failed", response.status, response.statusText);

      // TODO: add logic for incorrect username or password
      return;
    }

    // setUser(data.user)
    // navigate("/dashboard")
    console.log("Login successful", data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Unable to reach the server:", error.message);
    } else {
      console.error("An unknown error occured");
    }
  }

  console.log("Register event submit");
}

function LoginForm() {
  return (
    <div className="auth-form">
      <h2 id="auth-title">Welcome Back</h2>
      <p>Log in to continue to BloxBlueprint.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="login-username">Username</label>
        <input
          id="login-username"
          name="username"
          type="text"
          autoComplete="username"
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />

        <button className="button button-primary" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
